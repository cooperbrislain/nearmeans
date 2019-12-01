import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <footer />
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
}

export default connect(mapStateToProps, null)(Footer);
