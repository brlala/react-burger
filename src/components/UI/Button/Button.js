import classes from './Button.module.css';

const button = ({ clicked, children, btnType }) => (
  <button
    type="button"
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);

export default button;
