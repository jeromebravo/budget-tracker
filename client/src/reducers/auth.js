import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: true
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SET_CURRENT_USER:
            return {...state, user: payload, isAuthenticated: !!Object.keys(payload).length, loading: false};

        default:
            return state;
    }
}