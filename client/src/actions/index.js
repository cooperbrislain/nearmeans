import * as types from './types';
import axios from 'axios';

export const searchPart = formProps => async dispatch => {
    try {
        const response = await axios.post('/api/search', formProps);
        dispatch({ type: types.SEARCH_PART, payload: response.data.parts });
    } catch (e) {
        dispatch({ type: types.SEARCH_ERROR, payload: 'No Part Found' });
    }
};

export const signUp = (formProps, callback) => async dispatch => {
    try {        
        const response = await axios.post('/api/auth/signup', formProps);
        dispatch({ type: types.AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: types.AUTH_ERROR, payload: 'Email is in use' });
    }
};

export const signIn = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('/api/auth/signin', formProps);
        dispatch({ type: types.AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: types.AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const signOut = () => {
    localStorage.removeItem('token');
    return {
        type: types.AUTH_USER,
        payload: ''
    };
};

export const addPart = (formProps) => async dispatch => {
    try {
        const response = await axios.post('/api/inventory', formProps);
        dispatch({ type: types.ADD_PART, payload: response.data.part });
    } catch (e) {
        dispatch({ type: types.ADD_PART_ERROR, payload: 'Failed to add part' });
    }
};
