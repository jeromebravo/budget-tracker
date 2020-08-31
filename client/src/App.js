import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import setTokenHeader from './utils/setTokenHeader';
import {loadUser, logout} from './actions/auth';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Main from './components/Main';
import './App.css';

if(localStorage.token) {
    setTokenHeader(localStorage.token);
    store.dispatch(loadUser());
} else {
    store.dispatch(logout());
}

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <Alert />
                    <div className='container'>
                        <Main />
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
