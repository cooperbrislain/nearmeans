import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchUser } from './../../actions';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

class Dashboard extends Component {
    componentDidMount = () => this.props.fetchUser();

    render() {
        const { activeUser } = this.props.state.user;
        console.log(activeUser);
        return (
            <Container>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Username</Form.Label>
                        <Col sm={10}><Form.Control type="text" placeholder="Username" /></Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}><Form.Control type="email" placeholder="Email" /></Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}><Button>Change</Button></Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Location</Form.Label>
                        <Col sm={10}><Form.Control type="text" placeholder="Location" /></Col>
                    </Form.Group>
                </Form>
            </Container>
        );
    }d
}

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { fetchUser }))(Dashboard);
