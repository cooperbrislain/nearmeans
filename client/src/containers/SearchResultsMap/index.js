import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import GoogleMapReact from 'google-map-react';
import google_api_key from './keys.js';
import Marker from './../GoogleMapMarker';
import styles from './index.css';

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
        if (searchResults) {
            return (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: google_api_key }}
                    center={center}
                    zoom={zoom}
                >
                    { searchResults.map((item, i) =>
                        <Marker
                            key={i}
                            lat={item.location.lat}
                            lng={item.location.lng}
                            name={item.item.name}
                            text={item.item.name}
                        />
                    )}
                </GoogleMapReact>
            );
        } else {
            return <div/>;
        }
    }

    render() {
        return (
            <div style={{ height: '50vh', width: '100%' }}>
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
