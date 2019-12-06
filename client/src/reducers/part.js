import {
    PART_LIST,
    PART_ADD,
    PART_ERROR
} from './../actions/types';

const INITIAL_STATE = {
    parts: [],
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action)  {
    switch(action.type) {
        case PART_LIST:
        case PART_ADD:
            return {...state, inventory: action.payload };
        case PART_ERROR:
            return {...state, errorMessage: action.payload };
        default:
            return state;
    }
}
