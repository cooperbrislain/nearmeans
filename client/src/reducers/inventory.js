import {
    INV_LIST,
    INV_ADD,
    INV_ERROR
} from './../actions/types';

const INITIAL_STATE = {
    inventory: [],
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action)  {
    switch(action.type) {
        case INV_LIST:
        case INV_ADD:
            return {...state, inventory: action.payload };
        case INV_ERROR:
            return {...state, errorMessage: action.payload };
        default:
            return state;
    }
}
