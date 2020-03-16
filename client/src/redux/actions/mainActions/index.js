import {
  FETCH_USER_DATA,
  LOGOUT,
  ON_BUTTON_CREATE_TRANSACTION,
  ON_BUTTON_HISTORY_TRANSACTION,
  ON_GET_USERS,
  ON_CLEAR_RECIPIENT_LIST,
  SET_RECIPIENT_NAME,
  SET_RECIPIENT_AMOUNT,
  ON_TRANSACTION_SUCCESS,
  ON_TRANSACTION_FAil,
  GET_LIST_USER_TRANSACTION,
  REPEAT_TRANSACTION,
  FETCH_ALL_SYSTEM_USERS
} from "../../types";
import { loadState } from "../../localStorage";
import { getLoggedUserInfo, getFilteredUserList, cleateTransaction, getListUserTransaction, getToken } from "../../../api/api";
import { reset } from 'redux-form';


function setAllUsers(arrUsers) {
  return {
    type: FETCH_ALL_SYSTEM_USERS,
    arrUsers
  }
}

export const fetchAllSystemUsersAsync = () => async (dispatch) => {
  const t = await getToken({ "email": "dima@gmail.com", "password": "dima333" })
  let allUsers = []
  const arrAllChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  await arrAllChars.forEach(async (char) => {
    const filterObj = { username: char }
    const partOfUsers = await getFilteredUserList(filterObj, t.data.id_token)
    partOfUsers.data.forEach(user => allUsers.push(user))
  })
  await dispatch(setAllUsers(allUsers))
}

export function repeatTransaction(transData) {
  return {
    type: REPEAT_TRANSACTION,
    transData: transData
  }
}

function onTransactionFail(transData) {
  return {
    type: ON_TRANSACTION_FAil,
    transData: transData
  }
}

function onTransactionSuccess(transData) {
  return {
    type: ON_TRANSACTION_SUCCESS,
    transData: transData
  }
}

export const onTransactionAsync = (transObj) => async (dispatch) => {

  try {
    const token = await loadState()
    const allTransactionDataObj = await cleateTransaction(transObj, token)
    if (typeof allTransactionDataObj === 'string') {
      if (allTransactionDataObj.trim() === 'Auth failed') {
        await dispatch(onTransactionFail())
      }
    }
    await dispatch(onTransactionSuccess(allTransactionDataObj))
    await dispatch(onGetListUserTransactionAsync())
    await dispatch(onFetchCurrentUserDataAsync())

  } catch (e) {
    console.log(e)
  }
}

// checkUser
export function setRecipientAmount(recipientAmount) {
  return {
    type: SET_RECIPIENT_AMOUNT,
    amount: +recipientAmount.amount
  }
}

export function setRecipientName(recipientName) {
  return {
    type: SET_RECIPIENT_NAME,
    name: recipientName.username
  }
}

export const onClearRecipient = () => async (dispatch) => {
  await dispatch(reset('getUser'));
  await dispatch(reset('checkUser'));
  dispatch({ type: ON_CLEAR_RECIPIENT_LIST })
}

function onGetUsers(recipients) {
  return {
    type: ON_GET_USERS,
    recipients
  }
}

export const onFetchFilterRecipientAsync = (filteredChar) => async (dispatch) => {
    try {
      const token = await loadState()
      const filteredList = await getFilteredUserList(filteredChar, token)
      if (typeof filteredList.message === 'string') {
        if (filteredList.message.trim() === 'Auth failed') {
          await dispatch(onTransactionFail())
        }
      }

      dispatch(onGetUsers(filteredList))
    } catch (e) {
      console.log(e)
    }

}

export function onButtonCreateTransaction() {
  return {
    type: ON_BUTTON_CREATE_TRANSACTION
  }
}

export function onButtonHistoryTransaction() {
  return {
    type: ON_BUTTON_HISTORY_TRANSACTION
  }
}

function onFetchUserData(userObj) {
  return {
    type: FETCH_USER_DATA,
    userObj
  }
}
function onFetchUserDataError() {
  return {
    type: LOGOUT
  }
}

export const onFetchCurrentUserDataAsync = () => async (dispatch) => {
  try {
    const token = await loadState()
    if (!token) {
      dispatch(onFetchUserDataError());
    }
    const userData = await getLoggedUserInfo(token)
    dispatch(onFetchUserData(userData))
  } catch (e) {
    dispatch(onFetchUserDataError());
    console.log(e)
  }
}

export const onGetListUserTransactionAsync = () => async (dispatch) => {
  try {
    const token = await loadState()
    const arrTransactions = await getListUserTransaction(token)
    dispatch({ type: GET_LIST_USER_TRANSACTION, arrTransactions })
  } catch (e) {
    console.log(e)
  }
}