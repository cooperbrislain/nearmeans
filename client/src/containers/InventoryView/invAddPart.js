import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from "redux";
import { connect } from "react-redux";
import { Form, Col, Button, Modal, FormControl } from 'react-bootstrap';
import { addInvItem } from "../../actions";

class InventoryAddPartControl extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    onSubmit(formProps) { this.props.addInvItem(formProps); };

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true});
    handleSubmit = async formProps => {
        console.log(formProps);
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>Add a Part to Inventory</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton><Modal.Title>Add Part</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(this.onSubmit)}>
                            <Form.Row>
                                <Col className="col-md-6"><FormControl name='itemName' placeholder='Part Name' /></Col>
                                <Col className="col-md-3"><FormControl name='itemLoc' placeholder='Location' /></Col>
                                <Col className="col-md-3"><FormControl name='itemQty' placeholder='Qty' /></Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit} type="submit">Save Changes</Button>
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
