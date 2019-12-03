import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { Form, Col, Button, InputGroup, Modal, FormControl } from 'react-bootstrap';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const ModalInvAdd = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log('HANDLESHOW');
        setShow(true);
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Col className="col-md-6">
                            <FormControl
                                name='partName'
                                placeholder='Part Name' />
                        </Col>
                        <Col className="col-md-3">
                            <FormControl
                                name='partLoc'
                                placeholder='Location' />
                        </Col>
                        <Col className="col-md-3">
                            <FormControl
                                name='partQty'
                                placeholder='Qty' />
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalInvAdd;
