import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { searchPart } from './../../actions';
import styles from './index.css';
import { Form, Col } from 'react-bootstrap';

const ReduxFormControl = ({input, meta, ...props}) => {
    return <Form.Control {...props} {...input} />
};

class PartSearch extends Component {
    onSubmit = formProps => {
        console.log('SUBMIT');
        console.log(formProps);
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
                        <Col>
                            <Field
                                name='partName'
                                component={ReduxFormControl}
                                placeholder='Part' />
                        </Col>
                        <Col>
                            <Field
                                name='searchZip'
                                component={ReduxFormControl}
                                placeholder='Zip Code' />
                        </Col>
                        <Col>
                            <Field
                                name='searchDistance'
                                component={ReduxFormControl}
                                placeholder='Distance'
                            />
                        </Col>
                    </Form.Row>
                    <button className={styles.button} type='submit'>Search</button>
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
