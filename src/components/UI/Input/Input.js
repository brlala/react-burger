import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      // eslint-disable-next-line react/jsx-props-no-spreading
      inputElement = <input className={classes.InputElement} {...props} />;
      break;
    case 'textarea':
      // eslint-disable-next-line react/jsx-props-no-spreading
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      // eslint-disable-next-line react/jsx-props-no-spreading
      inputElement = <input className={classes.InputElement} {...props} />;
  }
  return (
    <div className={classes.Input}>
      {/*// eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
