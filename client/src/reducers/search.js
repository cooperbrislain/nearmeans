import { SEARCH_PART, SEARCH_ERROR, GEOLOCATION, GEO_ERROR, REVERSE_GEOLOCATION } from './../actions/types';

const INITIAL_STATE = {
    searchResults: [],
    address: '',
    center: {
        lat: 37.85,
        lng: -122.32
    },
    searchError: '',
    geoError: ''
};

export default function(state = INITIAL_STATE, action)  {
    switch(action.type) {
        case SEARCH_PART:
            return {...state,
                searchResults: action.payload.searchResults,
                center: action.payload.center,
                radius: action.payload.radius
            };
        case SEARCH_ERROR:
            return {...state,
                searchError: action.payload
            };
        case GEOLOCATION:
            return {...state,
                center: action.payload,
            };
        case REVERSE_GEOLOCATION:
            return {...state,
                address: action.payload,
            };
        case GEO_ERROR:
            return {...state,
                geoError: action.payload
            };
        default:
            return state;
    }
}
