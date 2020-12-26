import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';

const checkout = ({ match, ings, purchased, history }) => {
  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
