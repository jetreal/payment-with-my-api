import React, { useState, useEffect } from "react";
import style from "./mainHeader.module.sass";
import LoginButton from "../../../common/LoginButton/LoginButton";

export default props => {
  let [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true)
    }, 500);
  }, []);
  return (
    <header
      className={style.mainHeader}
      style={{ transform: !isLoad ? "translateY(-200px)" : "translateY(0px)" }}
    >
      <LoginButton name="logout" logout={props.logout} />
      <div className={style.wellcome}>
        <p>
          Wellcome:
          <span>{props.name}</span>
        </p>
      </div>
      <div className={style.balance}>
        <p>
          Your balance:
          <span>{props.balance}</span>
          PW
        </p>
      </div>
    </header>
  );
};
