import React, {useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Homepage from './layout/Homepage';
import NewTransaction from './transaction/NewTransaction';
import EditTransaction from './transaction/EditTransaction';
import {connect} from 'react-redux';
import {removeAlert} from '../actions/alert';
import PropTypes from 'prop-types';

const Main = ({history, removeAlert}) => {
    useEffect(() => {
        history.listen(() => removeAlert());
    }, [history, removeAlert]);

    return (
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/register' render={props => <Register {...props} />} />
            <Route exact path='/login' render={props => <Login {...props} />} />
            <Route exact path='/income/new' render={props => <NewTransaction {...props} header={'NEW INCOME'} endpoint={'income'} />} />
            <Route exact path='/expense/new' render={props => <NewTransaction {...props} header={'NEW EXPENSE'} endpoint={'expense'} />} />
            <Route exact path='/income/:id/edit' render={props => <EditTransaction {...props} header={'EDIT INCOME'} endpoint={'income'} />} />
            <Route exact path='/expense/:id/edit' render={props => <EditTransaction {...props} header={'EDIT EXPENSE'} endpoint={'expense'} />} />
        </Switch>
    );
}

Main.propTypes = {
    history: PropTypes.object.isRequired,
    removeAlert: PropTypes.func.isRequired
}

export default withRouter(connect(null, {removeAlert})(Main));