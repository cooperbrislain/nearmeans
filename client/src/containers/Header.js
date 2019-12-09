import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthWidget from './auth';

class Header extends Component {
    render() {
        return (
            <header className='navbar navbar-expand navbar-dark'>
                <Link to='/'>NearMeans</Link>
                <AuthWidget />
            </header>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });
export default connect(mapStateToProps, null)(Header);
