import {ADD_ALERT, REMOVE_ALERT} from './types';
import {v4} from 'uuid';

// add alert
export const addAlert = (msg, type) => dispatch => {
    const id = v4();

    dispatch({
        type: ADD_ALERT,
        payload: {msg, type, id}
    });
}

// remove alert
export const removeAlert = () => dispatch => dispatch({
    type: REMOVE_ALERT
});