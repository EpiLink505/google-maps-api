import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles["button-33"]} ${
    props.className ? props.className : ""
  }`;

  const clickHandler = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <button className={classes} onClick={clickHandler}>
      {props.text}
    </button>
  );
}

export default Button;
