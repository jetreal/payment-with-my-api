import React from "react";
import style from "./preloader.module.sass";

export default (props) => {
  return (
    <div
      className={style.wrapperImage}
      style={{ opacity: !props.isLoaded ? "1" : "0",
              zIndex: !props.isLoaded ? '2' : '-1' }}
    >
    </div>
  );
};
