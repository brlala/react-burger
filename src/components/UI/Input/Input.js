import classes from './Input.module.css';

const input = ({
  elementType,
  elementConfig,
  value,
  label,
  changed,
  invalid,
  shouldValidate,
  touched,
}) => {
  let inputElement;
  const inputClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.InputElement}
          // eslint-disable-next-line react/jsx-props-no-spreading
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...elementConfig}
          value={value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/*// eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
