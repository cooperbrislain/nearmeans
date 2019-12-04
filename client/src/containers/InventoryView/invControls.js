import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import InventoryAddPartControl from './invAddPart';

class InvControls extends Component {
    render() {
        return (
            <InventoryAddPartControl />
        )
    }
}

function mapStateToProps(state) {
    return {state};
}

export default compose(
    connect(mapStateToProps, { })
)(InvControls);
