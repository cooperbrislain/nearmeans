import * as types from './../actions/types';

const INITIAL_STATE = {
    blog: {},
    blogs: [],
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.FETCH_BLOG:
            return {...state, blog: action.payload };
        case types.FETCH_BLOGS:
            return {...state, blogs: action.payload };
        case types.BLOGS_ERROR:
            return {...state, errorMessage: action.payload };
        case types.CREATE_BLOG:
            return {...state};
        default:
            return state;
    }
}


