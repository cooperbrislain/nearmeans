import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResults extends Component {
    renderSearchResults() {
        const { searchResults } = this.props;
        return searchResults?
                <ul>{searchResults.map((item, i) => <li key={i}>{item.item.name}</li>)}</ul>
                :
                <>No Parts Found.</>;
    }
    render() {
        return (
            <div id="search-results">
                { this.renderSearchResults() }
            </div>
        );
    }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(connect(mapStateToProps, { }),)(SearchResults);
