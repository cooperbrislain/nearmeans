import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import {reduxForm} from "redux-form";
import { Form, Button } from 'react-bootstrap';
import ModalInvAdd from './invModals';

class InvControls extends Component {
    render() {
        return (
            <Form>
                <Button variant="primary" onClick={ModalInvAdd.handleShow}>
                    Add a Part
                </Button>
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

