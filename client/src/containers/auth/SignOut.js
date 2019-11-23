import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from "redux";
import {reduxForm} from "redux-form";
import { signOut } from './../../actions';

class SignOut extends Component {
    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return <h1>Sorry to see you go!</h1>;
    }
}

// export default connect(null, { signout })(SignOut);
function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { signOut }),
    reduxForm({ form: 'signout'})
)(SignOut);
