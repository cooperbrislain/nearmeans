import React, {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";

class SearchResult extends Component {
    render () {
        const { key, title, location } = this.props;
        return (
            <li key={key}>
                <h4>{title}</h4>
                <div>{location}</div>
            </li>
        );
    }
}

class SearchResults extends Component {
    renderSearchResults() {
        const { searchResults } = this.props;
        console.log(this.props);
        return searchResults?
            <ul>
                {searchResults.map((item, i) => { return (
                    <SearchResult
                        key={i}
                        title={item.item.name}
                        location={item.location.name}
                    />
                )})}
            </ul>
            :
            <>No Parts Found.</>;
    }
    render() { return (<>{ this.renderSearchResults() }</>); }
}

const mapStateToProps = state => ({ searchResults: state.search.searchResults });
export default compose(connect(mapStateToProps, { },))(SearchResults);
