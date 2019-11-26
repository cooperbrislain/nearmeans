import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResults extends Component {
    renderSearchResults() {
        const { searchResults } = this.props;
        if (searchResults) {
            return (
                <ul>
                    {searchResults.map((value, index) => {
                        return <li key={index}>{value.name}</li>
                    })}
                </ul>
            );
        } else {
            return (
                <div>
                    No Parts Found.
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div id="search-results">
                    { this.renderSearchResults() }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { searchResults: state.search.searchResults };
}

export default compose(
    connect(mapStateToProps, {  }),
)(SearchResults);
