import React from "react";
import styles from "./CatCard.module.scss";
import ButtonItem from '../ButtonItem/ButtonItem'

interface Props {
  url: string;
}

const CatCard: React.FC<Props> = ({ url }) => {
  return (
    <div className={styles.container}>
      <img src={url} alt="Cat Card" />
      {/* <ButtonItem /> */}
    </div>
  );
};

export default CatCard;
