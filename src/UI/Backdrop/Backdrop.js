import styles from "./Backdrop.module.css";

function Backdrop(props) {
  const clickHandler = () => {
    props.toggleModal();
  };

  return <div className={styles.overlay} onClick={clickHandler}></div>;
}

export default Backdrop;
