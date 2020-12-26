import { useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const layout = ({ isAuthenticated, children }) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <>
      <div>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={isAuthenticated} />
      </div>
      <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} isAuth={isAuthenticated} />
      <main className={classes.Content}>{children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(layout);
