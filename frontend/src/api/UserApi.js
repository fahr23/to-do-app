import {doRequest} from './BaseApi'

const USER_PATH = "/api/user";
const AUTHENTICATION_PATH = "/login";
const LOGOUT_PATH = "/logout";

export const getSessionUser = () => {
     return doRequest(USER_PATH)
    .then( response => {
    	if( response.ok )
    		return response.json();
    	throw new Error('User not found.');
    });
}

export const authenticate = (username, password) => {
     return doRequest(AUTHENTICATION_PATH, {
	    method: 'post',
	    mode:'no-cors',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    body: loginParams({username, password})
	 });
}

export const logout = () => {
     return doRequest(LOGOUT_PATH);
}

const loginParams = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');