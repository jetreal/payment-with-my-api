import React, {useEffect} from "react";
import style from "./login.module.sass";
import FormContainer from "./LoginForm/LoginForm";
import FormWarning from "../Register/FormWarning/FormWarning";
import { NavLink, Redirect } from "react-router-dom";
import LoginButton from "../../common/LoginButton/LoginButton";
import { CSSTransition } from "react-transition-group";

export default props => {
  const { onClearFromWarning } = props;
  useEffect(() => {
    onClearFromWarning();
  }, [onClearFromWarning]);

  const onSubmit = data => {
    props.onSubmitLoginAsync(data);
  };

  if (props.LoginState.isChangeLoginPage) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <NavLink to="/register">
        <LoginButton name="register" />
      </NavLink>
      <CSSTransition
        in={true}
        appear={true}
        timeout={{
          appear: 1000,
          enter: 1000,
          exit: 1000
        }}
        classNames="fadeRegister"
      >
        <div className={style.loginBox}>
          <FormContainer
            onSubmit={onSubmit}
            onChange={props.onClearFromWarning}
          />
          {props.LoginState.warningText && (
            <CSSTransition
              in={true}
              appear={true}
              timeout={{
                appear: 1000,
                enter: 1000,
                exit: 1000
              }}
              classNames="fadeRegister"
            >
              <FormWarning warningText={props.LoginState.warningText} />
            </CSSTransition>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};
