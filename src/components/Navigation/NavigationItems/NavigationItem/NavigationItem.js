import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = ({ link, active, children, exact }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link} exact={exact} activeClassName={classes.active}>
      {' '}
      {children}{' '}
    </NavLink>
  </li>
);

export default navigationItem;
