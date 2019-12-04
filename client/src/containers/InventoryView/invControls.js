import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import {reduxForm} from "redux-form";
import {Form, Button, Modal, Col, FormControl} from 'react-bootstrap';
import InventoryAddPartControl from './invAddPart';

class InvControls extends Component {
    render() {
        return (
            <Form>
                <InventoryAddPartControl />
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {state};
}

export default compose(
    connect(mapStateToProps, { })
)(InvControls);
