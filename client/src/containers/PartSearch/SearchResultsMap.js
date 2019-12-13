import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import GoogleMapReact from 'google-map-react';
import google_api_key from './keys';
import styles from './index.css';
import Marker from './GoogleMapMarker';

class SearchResultsMap extends Component {
    static defaultProps = {
        center: {
            lat: 37.5,
            lng: -122.49
        },
        zoom: 11
    };

    renderGoogleMap() {
        const { searchResults, center, zoom } = this.props;
        if (!searchResults.length)
            return (<GoogleMapReact bootstrapURLKeys={{ key: google_api_key }} center={center} zoom={zoom} />);
        let locations = {};
        searchResults.forEach(searchResult => {
            const { location } = searchResult;
            if (locations[location._id]===undefined) {
                locations[location._id] = {
                    items: [],
                    geo: location.geo,
                    name: location.name
                };
            }
            locations[searchResult.location._id].items.push(searchResult);
        });
        if (locations !== {}) {
            return (
                <GoogleMapReact bootstrapURLKeys={{ key: google_api_key }} center={center} zoom={zoom}>
                    { Object.keys(locations).map((k, i) => {
                        const location = locations[k];
                        return (
                            <Marker lat={location.geo.lat} lng={location.geo.lng} name={location.name}>
                                <ul>
                                    { location.items.map((item, i) => (<li key={i}>{item.item.name}</li>)) }
                                </ul>
                            </Marker>
                        )
                    })}
                </GoogleMapReact>
            )
        } else {
            return <div/>;
        }
    }

    render() {
        return (
            <div id="map" style={{ height: '100%', width: '100%', position: 'fixed', top: '0px', left: '0px', zIndex: -10 }}>
                { this.renderGoogleMap() }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchResults : state.search.searchResults,
    center: state.search.center
});
export default compose(connect(mapStateToProps, { }))(SearchResultsMap);