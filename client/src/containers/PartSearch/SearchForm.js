import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import ReduxFormControl from "../reduxFormControl";
import FA from "../FA";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {searchPart} from "../../actions";

const getGeoForUser = () => {
    navigator.geolocation.getCurrentPosition((result) => {
        const { coords } = result;
    });
};

class SearchForm extends Component {
    onSubmit = (formProps) => this.props.searchPart(formProps);
    autoComplete = async (e) => axios.get(`/api/util/autocomplete/part?q=${e}`);
    render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.onSubmit)} className=''>
                <Form.Row>
                    <Col className="col-md-3">
                        <Field name='searchQuery' component={ReduxFormControl} onChange={this.autoComplete} placeholder='Part' />
                    </Col>
                    <Col className="col-md-2">
                        <InputGroup className="mb-3">
                            <Field name='searchZip' component={ReduxFormControl} placeholder='Zip Code' />
                            <InputGroup.Append onClick={getGeoForUser}>
                                <InputGroup.Text><FA icon={faMapMarkerAlt} /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-md-2">
                        <InputGroup className="mb-3">
                            <Field name='searchDistance' component={ReduxFormControl} placeholder='Distance' />
                            <InputGroup.Append>
                                <InputGroup.Text>Mi.</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-md-1">
                        <Button className={styles.button} type='submit'>Search</Button>
                    </Col>
                </Form.Row>
            </Form>
        );
    }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(
    connect(mapStateToProps, { searchPart }),
    reduxForm({ form: 'searchForm' })
)(SearchForm);
