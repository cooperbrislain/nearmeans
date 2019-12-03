import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import GoogleMapReact from 'google-map-react';
import google_api_key from './keys.js';

const Marker = ({ text }) => <div>{text}</div>;

class SearchResultsMap extends Component {
    static defaultProps = {
        center: {
            lat: 37.5,
            lng: -122.49
        },
        zoom: 11
    };

    renderGoogleMap() {
        const { searchResults } = this.props;
        if (searchResults) {
            console.log(searchResults);
            return (
                <GoogleMapReact
                    bootstrapURLKeys={google_api_key}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    { searchResults.map((item, i) =>
                        <Marker
                            key={i}
                            lat={item.location.latitude}
                            lng={item.location.longitude}
                            text={item.item.name}
                        />
                    )
                    }
                </GoogleMapReact>
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
            <div style={{ height: '100vh', width: '100%' }}>
                { this.renderGoogleMap() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { searchResults: state.search.searchResults };
}

export default compose(
    connect(mapStateToProps, { }),
)(SearchResultsMap);
