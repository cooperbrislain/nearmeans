import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';

import App from './components/App';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import SignOut from './containers/auth/SignOut';
import PartSearch from './containers/PartSearch';
import SearchResults from "./containers/SearchResults";
import UserInfo from "./containers/UserInfo";
import InventoryView from "./containers/InventoryView";

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducers,
    {
        auth: { authenticated: localStorage.getItem('token')}
    },
    composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signout' component={SignOut} />
                <Route exact path='/' component={Jumbotron}>
                    <PartSearch />
                    <SearchResults />
                </Route>
                <Route exact path='/inventory' component={InventoryView} />
            </App>
        </Router>
    </Provider>
    ,document.getElementById('root'));
