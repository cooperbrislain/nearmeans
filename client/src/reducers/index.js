import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import counter from './counter';
import auth from './auth';
import blogs from './blog';

export default combineReducers({
    auth,
    blogs,
    counter,
    form: formReducer
});
