import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthWidget from './auth';

const style = {
    color: 'white',
    backgroundColor: 'dodgerblue'
};

class Header extends Component {
    render() {
        return (
            <header className='navbar navbar-expand navbar-dark' style={style}>
                <h1>Near<em>Me</em>ans</h1>
                <AuthWidget />
            </header>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });
export default connect(mapStateToProps, null)(Header);
