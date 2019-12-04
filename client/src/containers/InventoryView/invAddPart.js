import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { Form, Col, Button, InputGroup, Modal, FormControl } from 'react-bootstrap';
import { addInvItem } from "../../actions";

class InventoryAddPartControl extends Component {
    onSubmit = formProps => {
        this.props.searchPart(formProps);
    };

    handleClose() {
        // setShow(false);
    }

    handleShow() {
        // setShow(true);
    }

    handleSubmit = async formProps => {
        console.log('SUBMIT');
        console.log(formProps);
    };

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>Add a Part to Inventory</Button>

                <Modal show={this.show} onHide={this.handleClose}>
                    <Modal.Header closeButton><Modal.Title>Add Part</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Col className="col-md-6"><FormControl name='itemName' placeholder='Part Name' /></Col>
                                <Col className="col-md-3"><FormControl name='itemLoc' placeholder='Location' /></Col>
                                <Col className="col-md-3"><FormControl name='itemQty' placeholder='Qty' /></Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { addInvItem }),
    reduxForm({ form: 'addinv' })
)(InventoryAddPartControl);
