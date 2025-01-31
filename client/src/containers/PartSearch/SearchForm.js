import React, {Component} from "react";
import axios from "axios";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import ReduxFormControl from "../ReduxFormControl";
import Select from 'react-select';
import FA from "../FA";
import { faMapMarkerAlt, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { searchPart, getGeoFromDevice, getReverseGeoCode } from "../../actions";

class SearchForm extends Component {
    onSubmit = (formProps) => this.props.searchPart(formProps);
    onLocate = () => {
        this.props.getGeoFromDevice();
        const { center } = this.props;
        this.props.getReverseGeoCode(center);
    };
    autoComplete = async (e) => axios.get(`/api/util/autocomplete/part?q=${e}`);
    render() {
        const { handleSubmit, center } = this.props;
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
                    <Col md={6}>
                        <InputGroup mb={3}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Search For</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field
                                name='searchQuery'
                                component={ReduxFormControl}
                                onChange={this.autoComplete}
                                placeholder='Part, Tool, Equipment'
                                tabIndex={1}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2} style={{ paddingRight: 0 }}>
                        <Field
                            name='searchTransactionType'
                            type='select-multi'
                            placeholder='Near'
                            component={Select}
                            options={searchDistanceOptions}
                            className='searchDistanceOptions'
                        />
                    </Col>
                    <Col md={3} style={{ paddingLeft: 0 }}>
                        <InputGroup mb={5}>
                            <Field
                                name='searchLocation'
                                className="searchLocation"
                                component={ReduxFormControl}
                                placeholder='Zip, Addr, Loc'
                                tabIndex={2}
                            />
                            <InputGroup.Append onClick={this.onLocate}>
                                <InputGroup.Text>
                                    <FA icon={faMapMarkerAlt} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col md={1}>
                        <Button
                            className='searchButton'
                            type='submit'
                            tabIndex={3}>
                            <FA icon={faArrowAltCircleRight} />
                        </Button>
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

const mapStateToProps = state => {
    console.log(state);
    return ({ searchResults: state.search.searchResults, center: state.search.center });
};
const mapDispatchToProps = { searchPart, getGeoFromDevice, getReverseGeoCode };
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'searchForm' })
)(SearchForm);
