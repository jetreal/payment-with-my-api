import React from "react";
import style from "../warningMesageSusses/warningMessage.module.sass";

export default props => {
  return (
    <div className={style.congratulationWrap} style={{ color: "#0078D7" }}>
      <br />
      <br />
      Transaction failed !!!
      <br />
      <h3>
        You are not logged in. Session timed out.
        <br />
        Pleace login again!
      </h3>
    </div>
  );
};
