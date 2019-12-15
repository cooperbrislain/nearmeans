import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthWidget from './auth';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import FA from './FA';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const navBarStyle = {
    color: 'white',
    backgroundColor: 'dodgerblue'
};

class Header extends Component {
    render() {
        return (
            <Navbar variant="dark" style={navBarStyle}>
                <Navbar.Brand href="/">
                    <h1>Near<em>Me</em>ans</h1>
                </Navbar.Brand>
                <Nav className='mr-auto'>
                </Nav>
                <Nav>
                    <Nav.Link href='/inventory'>Inventory</Nav.Link>
                    <NavDropdown title='User'>
                        <AuthWidget />
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });
export default connect(mapStateToProps, null)(Header);
