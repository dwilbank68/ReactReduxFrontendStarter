import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/types';

var authReducer = (state={user:{}}, action) => {

    switch(action.type){
        case AUTH_USER: return      {...state, error: '', authenticated: true};
        case UNAUTH_USER: return    {...state, error: '', authenticated: false};
        case AUTH_ERROR: return     {...state, error: action.payload};
        case FETCH_MESSAGE: return  {...state, user: {
                                                        email: action.payload.email,
                                                        id: action.payload.id
                                                    }};
        default: return state;
    };
};

export default authReducer;

////////// paste this in index.js - auth reducer //////////////

// import authReducer from './auth_reducer';

// auth: authReducer

//////////// paste this in test ///////////////

// var expect = require("expect");
// var df = require('deep-freeze-strict');

// var reducers = require("reducers");

// describe('authReducer', () => {
//    it('should ', () => {
//        var action = {
//            type: DO_IT
//        }
//        var res = reducers.authReducer(df(), df(action));
//        expect(res).toEqual();
//    });
//});












