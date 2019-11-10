import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from './../../actions';

class SignOut extends Component {
    componentDidMount() {
        this.props.signout();
    }

    render() {
        return <h1>Sorry to see you go!</h1>;
    }
}

export default connect(null, { signout })(SignOut);

