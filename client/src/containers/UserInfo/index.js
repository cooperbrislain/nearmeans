import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from "redux";
import { connect } from "react-redux";
import { Form, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ReduxFormControl from "../ReduxFormControl";

class UserInfo extends Component {
    renderUserInfo() {
        return (
            <Form>
                <Form.Row>
                    <Col md={1}>
                        Email
                    </Col>
                    <Col md={2}>
                        <InputGroup mb={3}>
                            <Field name='searchZip' component={ReduxFormControl} placeholder='Email Address' />
                        </InputGroup>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={1}>
                        Location
                    </Col>
                    <Col md={2}>
                        <InputGroup className="mb-3">
                            <Field name='searchZip' component={ReduxFormControl} placeholder='Zip Code' />
                            <InputGroup.Append onClick={this.getGeolocation}>
                                <InputGroup.Text><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Row>
            </Form>
        );
    }

    render() {
        return(
            <div id='user-info'>
                { this.renderUserInfo() }
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });
export default compose(connect(mapStateToProps, { form: 'userForm' }))(UserInfo);
