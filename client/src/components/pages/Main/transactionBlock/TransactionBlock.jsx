import React from "react";
import style from "./transactionBlock.module.sass";
import UserReduxForm from "./userForm/UserForm";
import CheckUserReduxForm from "./checkUserForm/checkUserFrom";
import ClearBtn from "./clearBtn/ClearBtn";
import ConfirmTransaction from "./confirmTransaction/ConfirmTransaction";
import RecipientName from "./recipientName/RecipientName";

export default props => {
  const transObj = {
    name: props.recipient.name,
    amount: props.recipient.amount
  };

  const isRecipients = props.recipients.length;
  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>Create new transaction</h2>

      <ClearBtn 
        onClearRecipient={props.onClearRecipient}
        isRecipients={isRecipients}
      />

      {props.recipient.name === "" ? (
        <div>
          <UserReduxForm
            onChange={props.onFetchFilterRecipientAsync}
            placeholder="Enter the name of recipient"
            type="text"
          />
          <CheckUserReduxForm
            recipients={props.recipients}
            onSubmit={props.setRecipientName}
          />
        </div>
      ) : (
        <div className={style.recipientDiv}>
          <RecipientName recipName={props.recipient.name}/>

          {props.recipient.amount === 0 ? (
            <UserReduxForm
              placeholder="Enter the Amount money"
              type="text"
              onSubmit={props.setRecipientAmount}
              number="number"
            />
          ) : (
            <ConfirmTransaction
              amount={props.recipient.amount}
              onClearRecipient={props.onClearRecipient}
              onTransactionAsync={props.onTransactionAsync}
              transObj={transObj}
            />
          )}
        </div>
      )}
    </div>
  );
};
