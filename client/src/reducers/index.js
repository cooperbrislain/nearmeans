import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import search from './search';

export default combineReducers({
    auth,
    search,
    form: formReducer
});
