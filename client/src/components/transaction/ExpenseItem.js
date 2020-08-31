import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteTransaction} from '../../actions/transaction';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faCommentDots, faCoins, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

const ExpenseItem = ({_id, date, description, amount, deleteTransaction}) => (
    <div className='expense-item'>
        <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> {' '}
            <Moment format='MMMM DD, YYYY'>{date}</Moment>
        </p>
        <p>
            <FontAwesomeIcon icon={faCommentDots} /> {' '}
            {description}
        </p>
        <p>
            <FontAwesomeIcon icon={faCoins} /> {' '}
            {amount.toLocaleString()}
        </p>
        <div>
            <Link to={`/expense/${_id}/edit`} className='edit'>
                <FontAwesomeIcon icon={faEdit} /> {' '}
                Edit
            </Link>
            <button className='delete' onClick={() => deleteTransaction(_id, 'expense')}>
                <FontAwesomeIcon icon={faTrash} /> {' '}
                Delete
            </button>
        </div>
    </div>
);

ExpenseItem.propTypes = {
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    deleteTransaction: PropTypes.func.isRequired
}

export default connect(null, {deleteTransaction})(ExpenseItem);