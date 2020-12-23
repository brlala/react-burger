import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga({ token, orderData }) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(`/orders.json?auth=${token}`, orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actions.fetchOrdersStart());
  try {
    const response = yield axios.get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
    const fetchedOrders = [];
    for (const key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    console.log(fetchedOrders);
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
