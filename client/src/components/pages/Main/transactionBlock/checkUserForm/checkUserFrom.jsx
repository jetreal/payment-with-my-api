import {Field, formValueSelector, reduxForm} from 'redux-form'
import React from 'react'
import { connect } from 'react-redux'
import style from '../transactionBlock.module.sass'
import { RadioField } from '../../../../common/RadioButton/RadioButton'


let checkUserForm = (props) => {

  return (
    
      <form onSubmit={props.handleSubmit}>
        <ul>
          {props.recipients.map(recipient => {
            return (
              <label htmlFor={recipient.id} key={recipient.id}>
                <li key={recipient.id}>
                  <Field
                    component={RadioField}
                    className={style.inputRadio}
                    type="radio"
                    name="username"
                    id={recipient.id}
                    value={recipient.name}
                    
                  />
                  <span key={recipient.id}>{recipient.name}</span>
                  <input
                    className={style.inputChoose}
                    type="submit"
                    value=""
                    disabled={props.hasCheckedValue !== recipient.name}
                    style={props.hasCheckedValue !== recipient.name ?
                          {opacity: 0, pointerEvents: 'none'} :
                          {opacity: 1, pointerEvents: 'auto'}
                        }
                  />
                </li>
              </label>
            );
          })}
        </ul>
      </form>
    
  );
}

checkUserForm = reduxForm({
  form: 'checkUser',
  initialValues: {

  }
})( checkUserForm )

const selector = formValueSelector('checkUser')
checkUserForm = connect(state => {
  // can select values individually
  const hasCheckedValue = selector(state, 'username')

  return {
    hasCheckedValue
  }
})(checkUserForm)

export default checkUserForm