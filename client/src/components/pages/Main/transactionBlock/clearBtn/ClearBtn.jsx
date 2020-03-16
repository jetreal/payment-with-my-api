import React from 'react'
import style from './clearBtn.module.sass'

export default (props) => {
  return (
    <button
        className={style.clearBtn}
        onClick={props.onClearRecipient}
        style={{
          opacity: props.isRecipients === 0 ? "0.3" : "1",
          cursor: props.isRecipients === 0 ? "default" : "pointer"
        }}
        disabled={props.isRecipients === 0}
      >
        Clear
      </button>
  )
} 