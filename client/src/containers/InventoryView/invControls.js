import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from "redux";
import {reduxForm} from "redux-form";
import {searchPart, signOut} from './../../actions';
import { Form, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

class InvControls extends Component {
    render() {
        return (
            <Form>
                <Button>+</Button>
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

