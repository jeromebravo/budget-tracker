import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

const Login = ({login, history, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login(formData, history);
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-header'>LOGIN</h1>

            <div className='form-group'>
                <FontAwesomeIcon icon={faEnvelope} className='form-icon' />
                <input className='form-input' type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            </div>

            <div className='form-group'>
                <FontAwesomeIcon icon={faLock} className='form-icon' />
                <input className='form-input' type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            </div>

            <button type='submit' className='form-submit'>LOGIN</button>

            <div>
                <p>Does not have an account?</p>
                <Link to='/register'>Register here!</Link>
            </div>
        </form>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);