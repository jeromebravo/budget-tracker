import axios from 'axios';
import {SET_CURRENT_USER} from './types';
import setTokenHeader from '../utils/setTokenHeader';
import {addAlert} from './alert';
import {clearTransaction} from './transaction';

// set current user
const setCurrentUser = user => dispatch => dispatch({
    type: SET_CURRENT_USER,
    payload: user
});

// load user
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/user');
        dispatch(setCurrentUser(res.data));
    } catch(err) {
        dispatch(logout());
    }
}

// register user
export const register = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth/register', formData, config);

        // deconstruct res.data
        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user
        dispatch(setCurrentUser(user));

        // redirect to homepage
        history.push('/');
    } catch(err) {
        const errors = err.response.data.errors;

        errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
    }
}

// login user
export const login = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth/login', formData, config);

        // desconstruct res.data
        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in headers
        setTokenHeader(token);

        // set current user
        dispatch(setCurrentUser(user));

        // redirect to homepage
        history.push('/');
    } catch(err) {
        const errors = err.response.data.errors;

        errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
    }
}

// logout user
export const logout = history => dispatch => {
    // remove token in local storage
    localStorage.removeItem('token');

    // remove token in header
    setTokenHeader(false)

    // set current user into empty object
    dispatch(setCurrentUser({}));

    // clear transaction
    dispatch(clearTransaction());
}