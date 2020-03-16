import React from "react";
import style from "./recipientName.module.sass";

export default props => {
  return (
    <div>
      <p>
        recipient:
        <br />
        <span className={style.recipientName}>{props.recipName}</span>
      </p>
    </div>
  );
};
