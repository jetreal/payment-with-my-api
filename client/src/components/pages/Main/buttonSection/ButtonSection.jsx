import React, {useState, useEffect} from 'react'
import style from './buttonSection.module.sass'
import { StyledButtonLeft, StyledButtonRight } from './styledButton'


export default (props) => {
  let [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true)
    }, 500)
  }, []);
  return (
    <div className={style.wrapperButtonSection}>
      <div className={style.btnLeft}>
        <StyledButtonLeft
          onClick={props.showHistorySection}
          isActive={props.isTransactionBlockActive}
          isLoad={isLoad}
        >
          {!props.isHistoryBlockActive ? 'Transaction History' : 'close'}
        </StyledButtonLeft>
      </div>
      <div className={style.btnRight}>
        <StyledButtonRight
          onClick={ props.showCreateSection }
          isActive={props.isHistoryBlockActive}
          isLoad={isLoad}
        >
          {!props.isTransactionBlockActive ? 'Create new transaction' : 'close'}
        </StyledButtonRight>
      </div>
    </div>
  )
} 