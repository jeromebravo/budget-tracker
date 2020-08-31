import axios from 'axios';
import {GET_TRANSACTION, CLEAR_TRANSACTION, ADD_INCOME, ADD_EXPENSE, UDPATE_INCOME, UPDATE_EXPENSE, EDIT_TRANSACTION} from './types';
import {addAlert} from './alert';

// get all expense and income
export const getTransactions = () => async dispatch => {
    try {
        const res = await axios.get('/api/transaction');

        // deconstruct res.data
        const {income, expense} = res.data;

        dispatch({
            type: GET_TRANSACTION,
            payload: {income, expense}
        })
    } catch(err) {
        console.log(err.message);
    }
}

// add new transaction
export const newTransaction = (formData, endpoint, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/transaction/${endpoint}`, formData, config);
        
        endpoint === 'income' ? dispatch({type: ADD_INCOME, payload: res.data}) : dispatch({type: ADD_EXPENSE, payload: res.data});
        history.push('/');
    } catch(err) {
        const errors = err.response.data.errors;

        errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
    }
}

// delete transaction
export const deleteTransaction = (id, endpoint) => async dispatch => {
    try {
        const res = await axios.delete(`/api/transaction/${endpoint}/${id}`);
        endpoint === 'income' ? dispatch({type: UDPATE_INCOME, payload: res.data}) : dispatch({type: UPDATE_EXPENSE, payload: res.data})
    } catch(err) {
        const error = err.response.data.msg;
        dispatch(addAlert(error, 'danger'));
    }
}

// get transaction by id
export const getTransactionById = (id, endpoint, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/transaction/${endpoint}/${id}`);
        dispatch({type: EDIT_TRANSACTION, payload: res.data});
    } catch(err) {
        const error = err.response.data.msg;
        history.push('/');
        dispatch(addAlert(error, 'danger'));
    }
}

// update transaction
export const udpateTransaction = (id, endpoint, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };    

    try {
        const res = await axios.put(`/api/transaction/${endpoint}/${id}`, formData, config);
        endpoint === 'income' ? dispatch({type: UDPATE_INCOME, payload: res.data}) : dispatch({type: UPDATE_EXPENSE, payload: res.data});
        history.push('/');
    } catch(err) {
        const errors = err.response.data;

        if(errors.errors) {
            return errors.errors.map(error => dispatch(addAlert(error.msg, 'danger')));
        }

        history.push('/');
        dispatch(addAlert(errors.msg, 'danger'));
    }
}

// clear transaction
export const clearTransaction = () => dispatch => dispatch({
    type: CLEAR_TRANSACTION
});