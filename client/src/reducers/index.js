import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import search from './search';
import inventory from './inventory';
import user from './user';

// import part from './part';

export default combineReducers({
    auth,
    search,
    inventory,
    user,
    form: formReducer
});
