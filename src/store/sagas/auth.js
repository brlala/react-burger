import { delay, put, call } from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga() {
  // optional but this makes it easier for testing
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga({ expirationTime }) {
  yield delay(expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga({ email, password, isSignup }) {
  yield put(actions.authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjz7r8GhmAu0--dKa-FxpJQ-f0zHdqhyI';
  if (!isSignup) {
    url =
      // eslint-disable-next-line max-len
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjz7r8GhmAu0--dKa-FxpJQ-f0zHdqhyI';
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}
