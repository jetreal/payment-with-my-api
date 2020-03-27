import React, { useEffect, useState } from "react";
import style from "./main.module.sass";
import MainHeader from "./mainHeader/MainHeader";
import ButtonSection from "./buttonSection/ButtonSection";
import TransactionBlock from "./transactionBlock/TransactionBlock";
import HistoryBlock from "./historyBlock/HistoryBlock";

import { CSSTransition } from "react-transition-group";
import Preloader from "../../common/Preloader/Preloader";
import WarningMessage from "./warningMesageSusses/WarningMessage";
import WarningMessageFail from "./warningFailMessage/WarningMessageFail";

export default props => {
  let [isLoaded, setIsLoaded] = useState(false);

  const {onFetchCurrentUserDataAsync, onGetListUserTransactionAsync} = props
  // const date = new Date()
  // console.log(`${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`)
  useEffect(() => {
    onFetchCurrentUserDataAsync();
    onGetListUserTransactionAsync();
    setIsLoaded(true);
  }, [onFetchCurrentUserDataAsync, onGetListUserTransactionAsync]);

  return (
    <div className={style.main}>
      <Preloader isLoaded={isLoaded} />

      <MainHeader
        logout={props.onLogout}
        name={props.MainState.userData.name}
        balance={props.MainState.userData.balance}
      />

      <ButtonSection
        showCreateSection={props.onButtonCreateTransaction}
        isTransactionBlockActive={props.MainState.isTransactionButton}
        showHistorySection={props.onButtonHistoryTransaction}
        isHistoryBlockActive={props.MainState.isHistoryButton}
      />
      {props.MainState.isTransactionButton && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={{
            appear: 2000,
            enter: 1000,
            exit: 1000
          }}
          classNames="fade"
        >
          <TransactionBlock
            onFetchFilterRecipientAsync={props.onFetchFilterRecipientAsync}
            recipients={props.MainState.filterRecipients}
            recipient={props.MainState.recipient}
            onClearRecipient={props.onClearRecipient}
            setRecipientName={props.setRecipientName}
            setRecipientAmount={props.setRecipientAmount}
            onTransactionAsync={props.onTransactionAsync}
            onFetchCurrentUserDataAsync={props.onFetchCurrentUserDataAsync}
          />
        </CSSTransition>
      )}
      {!props.MainState.isTransactionButton &&
        !props.MainState.isHistoryButton &&
        props.MainState.isTransationSuccess && (
          <WarningMessage
            name={props.MainState.successRecipient.name}
            amount={props.MainState.successRecipient.amount}
          />
        )}

      {!props.MainState.isTransactionButton &&
        !props.MainState.isHistoryButton &&
        props.MainState.isTransationFailed && (
          <WarningMessageFail />
        )}

      {props.MainState.isHistoryButton && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={{
            appear: 2000,
            enter: 1000,
            exit: 1000
          }}
          classNames="fadeRegister"
        >
          <HistoryBlock
            arrayOfTransactions={props.MainState.arrayOfTransactions}
            repeatTransaction={props.repeatTransaction}
          />
        </CSSTransition>
      )}
    </div>
  );
};
// some