import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './index.css';

class AuthWidget extends Component {
    renderLinks(){
        const { auth } = this.props;
        return (auth?
            <div>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/inventory'>Inventory</Link>
                <Link to='/signout'>Sign Out</Link>
            </div>
            :
            <div>
                <Link to='/signup'>Sign up</Link>
                <Link to='/signin'>Sign in</Link>
            </div>
        );
    }

    render() {
        return(
            <div id='auth-widget' style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                { this.renderLinks() }
            </div>
        );
    }
}

const mapStateToProps = state => ({ auth: state.auth.authenticated });
export default compose(connect(mapStateToProps, { }))(AuthWidget);
