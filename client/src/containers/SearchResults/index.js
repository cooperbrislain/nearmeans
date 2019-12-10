import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResults extends Component {
    renderSearchResults() {
        const { searchResults } = this.props;
        console.log(this.props);
        return searchResults?
                <ul>{searchResults.map((item, i) => <li key={i}>{item.item.name}</li>)}</ul>
                :
                <>No Parts Found.</>;
    }
    render() { return (<>{ this.renderSearchResults() }</>); }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(connect(mapStateToProps, { }),)(SearchResults);
