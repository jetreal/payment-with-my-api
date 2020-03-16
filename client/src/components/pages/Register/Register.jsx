import React, { useEffect } from "react";
import style from "../Login/login.module.sass";
import RegisterForm from "./RegisterForm/RegisterForm";
import FormWarning from "./FormWarning/FormWarning";
import { NavLink, Redirect } from "react-router-dom";
import LoginButton from "../../common/LoginButton/LoginButton";
import { CSSTransition } from "react-transition-group";

export default props => {

const {onClearFromWarning, fetchAllSystemUsersAsync} = props
  useEffect(() => {
    onClearFromWarning();
    // fetchAllSystemUsersAsync();
  }, [onClearFromWarning, fetchAllSystemUsersAsync]);

  if (props.LoginState.isChangeRegisterPage) {
    return <Redirect to="/login" />;
  }
  const allUsers = props.allSystemUsers;

  const onRegisterSubmit = formData => {
    props.onSubmitRegisterAsync(formData, allUsers);
  };

  return (
    <div>
      <NavLink to="/login">
        <LoginButton name="login" />
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
          <h1>Register</h1>

          <RegisterForm
            onSubmit={onRegisterSubmit}
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
