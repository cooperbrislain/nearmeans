import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResults extends Component {
    renderSearchResults() {
        if (this.props.searchResults) {
            this.props.searchResults.map((item, i) => {
                return (
                    <div key={i}>
                        <h3>{item.name}</h3><h4>{item.zipcode}</h4>
                    </div>
                );
            });
        } else {
            return (
                <div>
                    Results will be Here!
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
    connect(mapStateToProps, {}),
)(SearchResults);
