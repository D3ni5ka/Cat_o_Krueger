import React from "react";
import styles from "./ButtonItem.module.scss";

const ButtonItem = () => {
  return (
    <div className={styles.btn}>
      <a
        href="#"
        className="btn btn-primary disabled"
        tabIndex={-1}
        role="button"
        aria-disabled="true"
      >
        Primary link
      </a>
    </div>
  );
};

export default ButtonItem;
