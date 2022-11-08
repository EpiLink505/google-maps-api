import styles from "./Modal.module.css";

function Modal(props) {
  const classes = `${styles.modal} ${props.className ? props.className : ""}`;

  return <div className={classes}>{props.children}</div>;
}

export default Modal;
