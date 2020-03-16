import React from "react";
import style from "./formWarning.module.sass";

const FormWarning = props => {
  return (
    <div className={style.formWarning}>
      <p>{props.warningText}</p>
    </div>
  );
};

export default FormWarning;
