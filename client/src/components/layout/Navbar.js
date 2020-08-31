import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faUserPlus, faUser, faPlus} from '@fortawesome/free-solid-svg-icons';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul className='nav-right'>
            <li className='dropdown'>
                <span className='nav-link'>
                    <FontAwesomeIcon icon={faPlus} className='nav-icon' />
                    <span className='nav-link-text'>New</span>
                </span>
                <div className='dropdown-content'>
                    <Link to='/income/new'>Income</Link>
                    <Link to='/expense/new'>Expense</Link>
                </div>
            </li>
            <li>
                <Link to='/' className='nav-link' onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-icon' />
                    <span className='nav-link-text'>Logout</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul className='nav-right'>
            <li>
                <Link to='/register' className='nav-link'>
                    <FontAwesomeIcon icon={faUserPlus} className='nav-icon' />
                    <span className='nav-link-text'>Register</span>
                </Link>
            </li>
            <li>
                <Link to='/login' className='nav-link'>
                    <FontAwesomeIcon icon={faUser} className='nav-icon' />
                    <span className='nav-link-text'>Login</span>
                </Link>
            </li>
        </ul>
    )

    return (
        <nav className='nav'>
            <h1>
                <Link to='/' className='nav-header'>
                    BUDGET TRACKER
                </Link>
            </h1>

        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </nav>
    );
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);