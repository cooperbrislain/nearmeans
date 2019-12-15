import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchUser } from './../../actions';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import styles from './index.css';

class Dashboard extends Component {
    componentDidMount = () => this.props.fetchUser();

    render() {
        const { activeUser } = this.props.state.user;
        console.log(activeUser);
        return (
            <Container>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Username</Form.Label>
                        <Col sm={10}><Form.Control type="text" value={activeUser.username} /></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}><Form.Control type="email" value={activeUser.email} /></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}><Button>Change</Button></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Location</Form.Label>
                        <Col sm={10}><Form.Control type="text" value={activeUser.location} /></Col>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { fetchUser }))(Dashboard);
