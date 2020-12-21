import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjz7r8GhmAu0--dKa-FxpJQ-f0zHdqhyI';
    if (!isSignup)
      url =
        // eslint-disable-next-line max-len
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjz7r8GhmAu0--dKa-FxpJQ-f0zHdqhyI';
    try {
      const res = await axios.post(url, authData);
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
      dispatch(authFail(err.response.data.error));
    }
  };
};
