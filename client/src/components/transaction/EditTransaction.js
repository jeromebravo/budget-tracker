import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins, faCommentDots, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeAlert} from '../../actions/alert';
import {getTransactionById, udpateTransaction} from '../../actions/transaction';

const EditTransaction = ({history, match, header, endpoint, removeAlert, getTransactionById, transaction, udpateTransaction}) => {
    const [formData, setFormData] = useState({
        amount: 0,
        description: '',
        date: ''
    });

    const {amount, description, date} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        udpateTransaction(match.params.id, endpoint, formData, history);
    }

    useEffect(() => {
        if(!transaction) {
            getTransactionById(match.params.id, endpoint, history);
        }

        let date;

        if(transaction !== null) {
            date = new Date(transaction.date);

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            month = month.toString().length === 1 ? `0${month}` : month;

            date = `${year}-${month}-${day}`;
        }

        setFormData({
            amount: transaction !== null ? transaction.amount : 0,
            description: transaction !== null ? transaction.description : '',
            date: transaction !== null ? date : ''
        });

    }, [getTransactionById, transaction, endpoint, match.params.id, history]);

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-header'>{header}</h1>

            <div className='form-group'>
                <FontAwesomeIcon icon={faCoins} className='form-icon' />
                <input className='form-input' type='number' name='amount' min='0' value={amount} onChange={onChange} required />
            </div>

            <div className='form-group'>
                <FontAwesomeIcon icon={faCommentDots} className='form-icon' />
                <input className='form-input' type='text' name='description' value={description} onChange={onChange} placeholder='Description' required />
            </div>

            <div className='form-group'>
                <FontAwesomeIcon icon={faCalendarAlt} className='form-icon' />
                <input className='form-input' type='date' name='date' value={date} onChange={onChange} required />
            </div>

            <button type='submit' className='form-submit' onClick={removeAlert}>SUBMIT</button>
        </form>
    );
}

EditTransaction.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    removeAlert: PropTypes.func.isRequired,
    getTransactionById: PropTypes.func.isRequired,
    transaction: PropTypes.object,
    udpateTransaction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    transaction: state.transaction.transaction
});

export default connect(mapStateToProps, {removeAlert, getTransactionById, udpateTransaction})(EditTransaction);