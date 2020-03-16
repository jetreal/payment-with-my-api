import React from "react";
import style from "./form.module.sass";
import { Field, reduxForm } from "redux-form";
import {
  validateLength,
  isEmail,
  required,
  passwordsMustMatch,
  onlyLetterAndNumber
} from "../../../../utils/validators/validator";
import FormInput from "../../../common/FormInput";

const maxLength = validateLength(4, 20);
const maxNameLength = validateLength(null, 26);

const RegisterForm = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className={style.textbox}>
          <Field
            component={FormInput}
            name={"username"}
            type={"text"}
            placeholder={"Username"}
            className={style.regInput}
            autoComplete="off"
            validate={[required, maxNameLength, onlyLetterAndNumber]}
          />
        </div>

        <div className={style.textbox}>
          <Field
            component={FormInput}
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            className={style.regInput}
            autoComplete="off"
            validate={[isEmail, required]}
          />
        </div>

        <div className={style.textbox}>
          <Field
            component={FormInput}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            className={style.regInput}
            autoComplete="off"
            validate={[maxLength, required]}
          />
        </div>

        <div className={style.textbox}>
          <Field
            component={FormInput}
            name={"confirmPassword"}
            type={"password"}
            placeholder={"Confirm Password"}
            className={style.regInput}
            autoComplete="off"
            validate={[passwordsMustMatch, required]}
          />
        </div>

        <input
          type="submit"
          className={style.btn}
          value="Register"
          onClick={props.collectUserData}
          disabled={props.pristine || props.submitting}
          style={
            props.pristine || props.submitting || props.invalid
              ? { opacity: 0.4, cursor: "not-allowed" }
              : { opacity: 1 }
          }
        />
      </form>
    </div>
  );
};

const RegisterReduxForm = reduxForm({
  form: "register"

})(RegisterForm);

export default RegisterReduxForm;
