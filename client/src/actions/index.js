import * as types from './types';
import axios from 'axios';

export const searchPart = formProps => async dispatch => {
    try {
        const response = await axios.post('/api/search/nearby', formProps);
        dispatch({ type: types.SEARCH_PART, payload: response.data });
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

export const fetchInventory = () => async dispatch => {
    const headers = { authorization: localStorage.getItem('token')};
    try {
        const response = await axios.get('/api/user/inv', { headers });
        dispatch({ type: types.INV_LIST, payload: response.data });
    } catch(e) {
        dispatch({ type: types.INV_ERROR, payload: 'Error loading inventory' });
    }
};

export const fetchUser = () => async dispatch => {
    const headers = { authorization: localStorage.getItem('token')};
    let response;
    try {
        response = await axios.get('/api/user', {headers});
        console.log(response);
        dispatch({type: types.USER_INFO, payload: response.data});
    } catch (e) {
        dispatch({ type: types.USER_ERROR, payload: 'Error retrieving user' });
    }
};

export const updateInvItem = (formProps) => async dispatch => {
    const headers = { authorization: localStorage.getItem('token')};
    const invItem = formProps;
    console.log(invItem);
    const invId = invItem._id;
    try {
        const resource = `/api/user/inv/${invId}`;
        const response = await axios.put(resource, invItem, { headers });
        dispatch({ type: types.INV_UPDATE, payload: response.data });
    } catch (e) {
        dispatch({ type: types.INV_ERROR, payload: 'Error updating inventory' });
    }
};

export const addPart = (formProps) => async dispatch => {
    try {
        const response = await axios.post('/api/part/add', formProps);
        dispatch({ type: types.PART_ADD, payload: response.data.part });
    } catch (e) {
        dispatch({ type: types.PART_ERROR, payload: 'Failed to add part' });
    }
};

export const addInvItem = (formProps) => async dispatch => {
    const headers = { authorization: localStorage.getItem('token')};
    console.log(formProps);
    try {
        const response = await axios.post('/api/user/inv/add', formProps, { headers });
        console.log(response);
        dispatch({ type: types.INV_ADD, payload: response.data.invItem });
    } catch (e) {
        dispatch({ type: types.INV_ERROR, payload: 'Failed to add item to inventory' });
    }
};
