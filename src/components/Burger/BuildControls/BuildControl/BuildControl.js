import classes from './BuildControl.module.css';

const buildControl = ({ label, added, removed, disabled }) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button type="button" className={classes.Less} onClick={removed} disabled={disabled}>
      Less
    </button>
    <button type="button" className={classes.More} onClick={added}>
      More
    </button>
  </div>
);

export default buildControl;
