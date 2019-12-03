import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { searchPart } from './../../actions';
import styles from './index.css';
import { Form, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const ReduxFormControl = ({input, meta, ...props}) => {
    return <Form.Control {...props} {...input} />
};

class PartSearch extends Component {
    onSubmit = formProps => {
        this.props.searchPart(formProps);
    };

    renderInput = ({ input }) => {
        return (
            <div>
                <input {...input}/>
            </div>
        )
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.onSubmit)} className=''>
                    <Form.Row>
                        <Col className="col-md-3">
                            <Field
                                name='partName'
                                component={ReduxFormControl}
                                placeholder='Part' />
                        </Col>
                        <Col className="col-md-2">
                            <InputGroup className="mb-3">
                                <Field
                                    name='searchZip'
                                    component={ReduxFormControl}
                                    placeholder='Zip Code' />
                                <InputGroup.Append>
                                    <InputGroup.Text><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col className="col-md-1">
                            <Field
                                name='searchDistance'
                                component={ReduxFormControl}
                                placeholder='Distance'
                            />
                        </Col>
                        <Col className="col-md-1">
                            <Button className={styles.button} type='submit'>Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default compose(
    connect(mapStateToProps, { searchPart }),
    reduxForm({ form: 'searchForm' })
)(PartSearch);
