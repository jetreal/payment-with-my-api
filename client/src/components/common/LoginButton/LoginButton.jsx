import React from 'react'
import style from './loginButton.module.sass'

export default (props) => {
  return (
    <button className={style.loginButton} onClick={props.logout}>
      {props.name}
    </button>
  )
}