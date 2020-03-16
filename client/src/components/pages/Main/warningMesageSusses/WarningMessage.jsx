import React from "react";
import style from "./warningMessage.module.sass";

export default props => {
  return (
    <div className={style.congratulationWrap}>
      <br />
      <br />
      Transaction success !!!
      <br />
      <h3>
        You sent a transaction to the recipient
        <br />
        with the name:
        <br />
        <span>{props.name}</span>, in the amount of
        <span>{props.amount}</span>pw.
      </h3>
    </div>
  );
};
