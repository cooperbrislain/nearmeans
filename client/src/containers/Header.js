import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks(){
        if(this.props.auth) {
            return (
                <div>
                    <Link to='/signout'>Sign Out</Link>
                    <Link to='/inventory'>Inventory</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/signin'>Sign in</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Link to='/'>NearMeans</Link>
                {this.renderLinks()}
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
}

export default connect(mapStateToProps, null)(Header);
