import React from "react";
import style from "./userForm.module.sass";
import { Field, reduxForm } from "redux-form";
import FormInput from "../../../../common/FormInput";
import {
  validateLength,
  availability,
  number
} from "../../../../../utils/validators/validator";
import { connect } from "react-redux";

const maxNameLength = validateLength(null, 24);

const lessThan = otherField => (value, previousValue, allValues) => {
  return value < 10001 ? value : previousValue;
};

const userForm = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className={style.textbox}>
          <Field
            component={FormInput}
            name={!props.number ? "username" : "amount"}
            type={props.type}
            placeholder={props.placeholder}
            className={style.regInput}
            autoComplete="off"
            maxLength={props.number ? "5" : "24"}
            validate={
              props.number !== "number"
                ? [maxNameLength]
                : [number, availability]
            }
            normalize={props.number === "number" ? lessThan(null) : undefined}
          />
        </div>
        {props.number === "number" && (
          <div>
            <input
              type="submit"
              className={style.btn}
              value="set"
              disabled={props.pristine || props.submitting}
              style={
                props.pristine || props.submitting || props.invalid
                  ? { opacity: 0.4, cursor: "not-allowed" }
                  : { opacity: 1 }
              }
            />
            <p> maximum transfer amount: 10000 pw </p>
          </div>
        )}
      </form>
    </div>
  );
};

let UserReduxForm = reduxForm({
  form: "getUser",
  initialValues: {
    min: 0,
    max: 1000
  }
})(userForm);

UserReduxForm = connect(state => {
  return {
    MainState: state.MainReducer
  };
})(UserReduxForm);

export default UserReduxForm;
