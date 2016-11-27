import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

// const ROOT_URL = 'https://wilbanks-node-api.herokuapp.com/'
const ROOT_URL = 'http://localhost:3000';

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage(){
    return function(dispatch){

        axios
            .get(ROOT_URL + '/users/me', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(
                (response) => {
                    dispatch({
                        type: FETCH_MESSAGE,
                        payload: {
                            id:response.data._id,
                            email: response.data.email
                        }
                    })
                },
                (err) => { console.log('this is error', err);}
            )

    }
}

export function signinUser({email, password}) {
    return function (dispatch) {

        axios
            .post(`${ROOT_URL}/users/login`, {email, password})
            .then((response)=> {
                dispatch({type: AUTH_USER});
                localStorage
                    .setItem('token', response.headers['x-auth']);
                browserHistory.push('/feature');
            })
            .catch((e) => {
                dispatch(authError('bad login info'))
            })

    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function signupUser({email, password}) {
    return function (dispatch) {

        axios
            .post(`${ROOT_URL}/users`, {email, password})
            .then(response=> {
                dispatch({type: AUTH_USER});
                localStorage
                    .setItem('token', response.headers['x-auth']);
                browserHistory.push('/feature');
            })
            .catch((e) => {
                dispatch(authError(e.response.data.error))
            })

    }
}