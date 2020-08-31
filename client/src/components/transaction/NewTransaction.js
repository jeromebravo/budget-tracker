import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins, faCommentDots, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newTransaction} from '../../actions/transaction';
import {removeAlert} from '../../actions/alert';

const NewTransaction = ({history, header, endpoint, newTransaction, removeAlert}) => {
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
        newTransaction(formData, endpoint, history);
    }

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

NewTransaction.propTypes = {
    history: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    newTransaction: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired
}

export default connect(null, {newTransaction, removeAlert})(NewTransaction);