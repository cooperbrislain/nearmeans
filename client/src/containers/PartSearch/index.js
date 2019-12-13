import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from "redux";
import { connect } from "react-redux";
import styles from './index.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import SearchResultsMap from './SearchResultsMap';
import { Jumbotron, Row, Col } from 'react-bootstrap';

class PartSearch extends Component {
    render() {
        return (
            <div id="part-search">
                <Row>
                    <Col><SearchForm /></Col>
                </Row>
                <Row>
                    <Col><SearchResultsMap /></Col>
                    {/*<Col className='col-md-3'><SearchResults /></Col>*/}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(connect(mapStateToProps, {}),)(PartSearch);
