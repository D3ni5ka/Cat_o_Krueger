import React from "react";
import ErrorCat from "./ErrorCat.png";
import styles from "./ErrorIndicator.module.scss";

const ErrorIndicator = () => {
  return (
    <div className={styles.errorBlock}>
      <div>
        <h3>Sorry, no results were found for your search</h3>
      </div>

      <div className={styles.errorImage}>
        <img width={150} height={150} src={ErrorCat} alt="ErrorCat" />
      </div>
    </div>
  );
};

export default ErrorIndicator;
