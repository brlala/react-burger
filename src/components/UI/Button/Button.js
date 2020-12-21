import classes from './Button.module.css';

const button = ({ clicked, children, btnType, disabled }) => (
  <button type="submit" className={[classes.Button, classes[btnType]].join(' ')} onClick={clicked} disabled={disabled}>
    {children}
  </button>
);

export default button;
