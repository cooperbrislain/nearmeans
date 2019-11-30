import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class AuthWidget extends Component {
    renderLinks(){
        const { auth } = this.props;
        console.log(auth);
        if(auth) {
            return (
                <div>
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link to='/inventory'>Inventory</Link>
                    <Link to='/signout'>Sign Out</Link>
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
        return(
            <div id='auth-widget' style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                { this.renderLinks() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
}

export default compose(
    connect(mapStateToProps, { }),
)(AuthWidget);
