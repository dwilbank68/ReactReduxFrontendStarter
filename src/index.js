import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';


import App from './components/app';
import Feature from './components/feature';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(
    applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome}/>
                <Route path="signin" component={Signin}/>
                <Route path="signup" component={Signup}/>
                <Route path="signout" component={Signout}/>
                <Route path="feature" component={RequireAuth(Feature)}/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('.container')
);
