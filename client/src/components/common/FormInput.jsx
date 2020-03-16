import React, {useRef} from 'react'

export default ({input, meta, ...props}) => {
  const myRef = useRef(null);
  return (
    <div >
      <input ref={myRef} {...input} {...props}
        onMouseEnter={(input.name === 'amount') ? (event) => myRef.current.onkeydown = (event) => event.keyCode === 32 ? false : true : null}
      />
      <br/>
      { (meta.error && meta.visited) && <span style={{color: 'yellow', fontSize: ".8rem"}}>{meta.error}</span> } 
    </div>
  )
}