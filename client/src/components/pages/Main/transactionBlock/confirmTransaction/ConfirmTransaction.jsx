import React from "react";
import style from "./confirmTransaction.module.sass";

export default props => {
  return (
    <div>
      <p>
        Amount:
        <br />
        <span className={style.recipientName}>{props.amount}</span>
        PW
      </p>
      <h3>Confirm transaction ?</h3>
      <div className={style.wrapperConfirmButtons}>
        <button onClick={props.onClearRecipient}>Cancel</button>
        <button onClick={props.onTransactionAsync.bind(null, props.transObj)}>
          Confirm
        </button>
      </div>
    </div>
  );
};
