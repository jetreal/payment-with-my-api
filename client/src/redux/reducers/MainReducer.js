import {
  FETCH_USER_DATA,
  //  FETCH_USER_DATA_ERROR,
  ON_BUTTON_CREATE_TRANSACTION,
  ON_BUTTON_HISTORY_TRANSACTION,
  ON_GET_USERS,
  ON_CLEAR_RECIPIENT_LIST,
  SET_RECIPIENT_NAME,
  SET_RECIPIENT_AMOUNT,
  ON_TRANSACTION_SUCCESS,
  CLEAR_FORM_WARNING,
  CLOSE_MENU,
  GET_LIST_USER_TRANSACTION,
  REPEAT_TRANSACTION,
  ON_TRANSACTION_FAil,
  FETCH_ALL_SYSTEM_USERS
} from "../types";

let initialState = {
  allSystemUsers: [],
  objOfSuccessTransaction: {},
  arrayOfTransactions: [],
  isTransationSuccess: false,
  isTransationFailed: false,
  successRecipient: {
    name: '',
    amount: 0
  },
  recipient: {
    name: '',
    amount: 0
  },
  filterRecipients: [],
  isHistoryButton: false,
  isTransactionButton: false,
  userData: {
    // id: 0,
    name: '',
    // email: '',
    balance: 0
  }
}

const MainReducer = (state = initialState, action) => {
  switch (true) {
    case (action.type === FETCH_ALL_SYSTEM_USERS): {
      let stateCopy = { ...state }
      stateCopy.allSystemUsers = action.arrUsers
      return stateCopy
    }
    case (action.type === REPEAT_TRANSACTION): {
      let stateCopy = { ...state }
      stateCopy.recipient.name = stateCopy.successRecipient.name = action.transData.original.transUsername
      stateCopy.recipient.amount = stateCopy.successRecipient.amount = Math.abs(action.transData.original.amount)
      stateCopy.isTransactionButton = true
      stateCopy.isHistoryButton = false

      return stateCopy
    }
    case (action.type === GET_LIST_USER_TRANSACTION): {
      let stateCopy = { ...state }
      stateCopy.arrayOfTransactions = action.arrTransactions.data.trans_token
      return stateCopy
    }
    case (action.type === CLOSE_MENU): {
      let stateCopy = { ...state }
      stateCopy.isTransactionButton = false
      stateCopy.isHistoryButton = false
      stateCopy.isTransactionButton = false
      stateCopy.recipient.amount = 0
      stateCopy.recipient.name = ''
      return stateCopy
    }

    case (action.type === CLEAR_FORM_WARNING): {
      let stateCopy = { ...state }
      stateCopy.isTransationFailed = false
      stateCopy.isTransationSuccess = false
      return stateCopy
    }
    case (action.type === ON_TRANSACTION_FAil): {
      let stateCopy = { ...state }
      stateCopy.isTransationFailed = true
      stateCopy.recipient.name = ''
      stateCopy.recipient.amount = 0
      stateCopy.isTransactionButton = false
      stateCopy.filterRecipients = []

      return stateCopy
    }
    case (action.type === ON_TRANSACTION_SUCCESS): {
      let stateCopy = { ...state }
      stateCopy.isTransationSuccess = true
      stateCopy.recipient.name = ''
      stateCopy.recipient.amount = 0
      stateCopy.isTransactionButton = false
      stateCopy.filterRecipients = []
      stateCopy.objOfSuccessTransaction = { ...action.transData.data.trans_token }
      return stateCopy
    }
    case (action.type === SET_RECIPIENT_AMOUNT): {
      let stateCopy = { ...state }
      stateCopy.recipient.amount = stateCopy.successRecipient.amount = action.amount
      return stateCopy
    }
    case (action.type === SET_RECIPIENT_NAME): {
      let stateCopy = { ...state }
      stateCopy.recipient.name = stateCopy.successRecipient.name = action.name
      return stateCopy
    }
    case (action.type === ON_CLEAR_RECIPIENT_LIST): {
      let stateCopy = { ...state }
      stateCopy.filterRecipients = []
      stateCopy.recipient.name = ''
      stateCopy.recipient.amount = 0
      return stateCopy
    }
    case (action.type === ON_GET_USERS): {
      let stateCopy = { ...state }
      stateCopy.filterRecipients = [...action.recipients.data.userNames]
      return stateCopy
    }
    case (action.type === ON_BUTTON_HISTORY_TRANSACTION): {
      let stateCopy = { ...state }
      if (!stateCopy.isTransactionButton) {
        stateCopy.isHistoryButton = !stateCopy.isHistoryButton
      }

      return stateCopy
    }
    case (action.type === ON_BUTTON_CREATE_TRANSACTION): {
      let stateCopy = { ...state }
      if (!stateCopy.isHistoryButton) {
        stateCopy.isTransactionButton = !stateCopy.isTransactionButton
      }
      if (!stateCopy.isTransactionButton) {
        stateCopy.filterRecipients = []
        stateCopy.recipient.name = ''
      }
      return stateCopy
    }
    case (action.type === FETCH_USER_DATA): {
      let stateCopy = { ...state }
      stateCopy.userData.balance = action.userObj.data.balance
      stateCopy.userData.name = action.userObj.data.username
      stateCopy.itAuth = true
      return stateCopy
    }

    default:
      return { ...state }
  }

}

export default MainReducer