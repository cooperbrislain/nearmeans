import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Nav, NavDropdown} from 'react-bootstrap';
import styles from './index.css';
import FA from "../FA";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class AuthWidget extends Component {
    renderLinks(){
        const { auth } = this.props;
        return (auth?
            <>
                <NavDropdown.Item href='/dashboard'>Account</NavDropdown.Item>
                <NavDropdown.Item href='/signout'>Sign Out</NavDropdown.Item>
            </>
            :
            <>
                <NavDropdown.Item href='/signup'>Sign up</NavDropdown.Item>
                <NavDropdown.Item href='/signin'>Sign in</NavDropdown.Item>
            </>
        );
    }

    render() {
        return(
            <div id='auth-widget'>
                { this.renderLinks() }
            </div>
        );
    }
}

const mapStateToProps = state => ({ auth: state.auth.authenticated });
export default compose(connect(mapStateToProps, { }))(AuthWidget);
