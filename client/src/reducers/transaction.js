import {GET_TRANSACTION, CLEAR_TRANSACTION, ADD_INCOME, ADD_EXPENSE, UDPATE_INCOME, UPDATE_EXPENSE, EDIT_TRANSACTION} from '../actions/types';

const initialState = {
    income: [],
    expense: [],
    transaction: null,
    loading: true
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_TRANSACTION:
            return {income: payload.income, expense: payload.expense, transaction: null, loading: false};

        case ADD_INCOME:
            return {...state, income: payload, loading: false};

        case ADD_EXPENSE:
            return {...state, expense: payload, loading: false};

        case UDPATE_INCOME:
            return {...state, income: payload, loading: false};

        case UPDATE_EXPENSE:
            return {...state, expense: payload, loading: false};

        case EDIT_TRANSACTION:
            return {...state, transaction: payload, loading: false};

        case CLEAR_TRANSACTION:
            return {income: [], expense: [], transaction: {}, loading: false};

        default:
            return state;
    }
}