import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';

const Register = ({register, history, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        register(formData, history);
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-header'>REGISTER</h1>

            <div className='form-group'>
                <FontAwesomeIcon icon={faUser} className='form-icon' />
                <input className='form-input' type='text' name='name' value={name} onChange={onChange} placeholder='Name' required />
            </div>

            <div className='form-group'>
                <FontAwesomeIcon icon={faEnvelope} className='form-icon' />
                <input className='form-input' type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            </div>

            <div className='form-group'>
                <FontAwesomeIcon icon={faLock} className='form-icon' />
                <input className='form-input' type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            </div>

            <button type='submit' className='form-submit'>REGISTER</button>

            <div>
                <p>Already have an account?</p>
                <Link to='/login'>Login here!</Link>
            </div>
        </form>
    );
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);