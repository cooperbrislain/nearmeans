import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResults extends Component {
    renderSearchResults() {
        const { searchResults } = this.props;
        if (searchResults) {
            return (
                <ul>
                    {searchResults.map((item, i) =>
                        <li key={i}>{item.item.name}</li>
                    )}
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
            <div id="search-results">
                { this.renderSearchResults() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { searchResults: state.search.searchResults };
}

export default compose(
    connect(mapStateToProps, { }),
)(SearchResults);
