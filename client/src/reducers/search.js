import { SEARCH_PART, SEARCH_ERROR } from './../actions/types';

const INITIAL_STATE = {
    searchResults: [],
    searchError: ''
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
        default:
            return state;
    }
}
