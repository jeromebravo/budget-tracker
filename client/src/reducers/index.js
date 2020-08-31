import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';
import transaction from './transaction';

const rootReducer = combineReducers({
    auth,
    alert,
    transaction
});

export default rootReducer;