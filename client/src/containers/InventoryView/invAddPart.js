import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { Form, Col, Button, InputGroup, Modal, FormControl } from 'react-bootstrap';
import { addInvItem } from "../../actions";

const InventoryAddPartControl = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async formProps => {
        console.log('SUBMIT');
        console.log(formProps);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add a Part to Inventory</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Add Part</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col className="col-md-6"><FormControl name='partName' placeholder='Part Name' /></Col>
                            <Col className="col-md-3"><FormControl name='partLoc' placeholder='Location' /></Col>
                            <Col className="col-md-3"><FormControl name='partQty' placeholder='Qty' /></Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { addInvItem }),
    reduxForm({ form: 'addinv' })
)(InventoryAddPartControl);
