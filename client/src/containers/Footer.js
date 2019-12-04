import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <footer />
        )
    }
}

function mapStateToProps({ state }) {
    return { state };
}

export default connect(mapStateToProps, null)(Footer);
