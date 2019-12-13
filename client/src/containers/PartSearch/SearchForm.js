import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import ReduxFormControl from "../reduxFormControl";
import Select from 'react-select';
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
        const listingTypeOptions = [
            { value: 'sale', label: 'Sale' },
            { value: 'rent', label: 'Rent' },
            { value: 'trade', label: 'Trade' },
            { value: 'free', label: 'Free' },
            { value: 'use', label: 'Use' },
            { value: '?' , label: '?' }
        ];
        const searchDistanceOptions = [
            { value: 'near', label: 'Near' },
            { value: 'within', label: 'Within' },
            { value: 'on', label: 'On' },
            { value: 'at', label: 'At' },
            { value: 'in', label: 'In' }
        ];
        return (
            <Form onSubmit={handleSubmit(this.onSubmit)} className='searchForm'>
                <Form.Row>
                    <Col className="col-md-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Search For</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name='searchQuery'
                                   component={ReduxFormControl}
                                   onChange={this.autoComplete}
                                   placeholder='Part, Tool, Equipment' />
                        </InputGroup>
                    </Col>
                    <Col className="col-md-2">
                        <Field name='searchTransactionType'
                               type='select-multi'
                               placeholder=''
                               component={Select}
                               options={searchDistanceOptions}
                        />
                    </Col>
                    <Col className="col-md-2">
                        <InputGroup className="mb-5">
                            <Field name='searchZip' component={ReduxFormControl} placeholder='Zip Code' />
                            <InputGroup.Append onClick={getGeoForUser}>
                                <InputGroup.Text><FA icon={faMapMarkerAlt} /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-md-1">
                        <Button className={styles.button} type='submit'>Search</Button>
                    </Col>
                </Form.Row>
                {/*<Form.Row>*/}
                {/*    <Col className='col-md-6'>*/}
                {/*        <InputGroup className="mb-3">*/}
                {/*            <InputGroup.Prepend>*/}
                {/*                <InputGroup.Text>For</InputGroup.Text>*/}
                {/*            </InputGroup.Prepend>*/}
                {/*            <Field name='searchTransactionType'*/}
                {/*                   placeholder=''*/}
                {/*                   component={Select}*/}
                {/*                   options={listingTypeOptions}*/}
                {/*                   isMulti*/}
                {/*            />*/}
                {/*        </InputGroup>*/}
                {/*    </Col>*/}
                {/*</Form.Row>*/}
            </Form>
        );
    }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(
    connect(mapStateToProps, { searchPart }),
    reduxForm({ form: 'searchForm' })
)(SearchForm);
