import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjz7r8GhmAu0--dKa-FxpJQ-f0zHdqhyI',
        authData
      )
      .then((res) => {
        console.log(res);
        dispatch(authSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail());
      });
    dispatch(authStart());
  };
};
