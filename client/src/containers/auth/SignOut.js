import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { reduxForm } from "redux-form";
import { signOut } from './../../actions';

class SignOut extends Component {
    componentDidMount() {
        this.props.signOut();
        this.props.history.push('/');
    }
    render() {
        return <h1>Sorry to see you go!</h1>;
    }
}

const mapStateToProps = state => ({ errorMessage: state.auth.errorMessage });
export default compose(
    connect(mapStateToProps, { signOut }),
    reduxForm({ form: 'signout'})
)(SignOut);
