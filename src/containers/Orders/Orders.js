import { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const orders = ({ onFetchOrders, token, userId, loading, orders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, []);

  let ordersComponent = <Spinner />;
  if (!loading) {
    ordersComponent = orders.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ));
  }
  return <div>{ordersComponent}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
