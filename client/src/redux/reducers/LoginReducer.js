import {
  SUBMIT_LOGIN,
  ON_LOGIN_ERROR,
  LOGOUT,
  ON_REGISTER_ERROR,
  SUBMIT_REGISTER,
  CLEAR_FORM_WARNING,
  CHANGE_REGISTERPAGE_WITH_DELAY,
  CHANGE_LOGINPAGE_WITH_DELAY
} from "../types";

let initialState = {
  isChangeRegisterPage: false,
  isChangeLoginPage: false,
  isRegisterSucces: false,
  warningText: '',
  jwt: '',
  loginData: {
    isAuth: true
  }
}

const LoginReducer = (state = initialState, action) => {
  switch (true) {
    case (action.type === CHANGE_LOGINPAGE_WITH_DELAY): {
      let stateCopy = { ...state }
      stateCopy.isChangeLoginPage = true
      return stateCopy
    }
    case (action.type === CHANGE_REGISTERPAGE_WITH_DELAY): {
      let stateCopy = { ...state }
      if (stateCopy.isRegisterSucces) {
        stateCopy.isChangeRegisterPage = true
        stateCopy.isRegisterSucces = false
      }
      return stateCopy
    }
    case (action.type === CLEAR_FORM_WARNING): {
      let stateCopy = { ...state }
      stateCopy.warningText = ''
      return stateCopy
    }
    case (action.type === LOGOUT): {
      let stateCopy = { ...state }
      stateCopy.loginData.isAuth = false;
      stateCopy.isChangeLoginPage = false;
      stateCopy.isChangeRegisterPage = false
      return stateCopy
    };
    case (action.type === SUBMIT_LOGIN): {
      let stateCopy = { ...state }
      stateCopy.jwt = action.loginData.data.id_token;
      stateCopy.loginData.isAuth = true;
      stateCopy.warningText = 'Success'

      return stateCopy
    }
    case (action.type === SUBMIT_REGISTER): {

      let stateCopy = { ...state }
      stateCopy.warningText = action.servResponce

      if (action.servResponce.status && action.servResponce.status === 201) {
        stateCopy.warningText = action.servResponce.statusText
        stateCopy.isRegisterSucces = true
      }
      return stateCopy
    }
    case (action.type === ON_LOGIN_ERROR): {
      let stateCopy = { ...state }

      if (action.errorData === '400') {
        stateCopy.warningText = 'Fill in all the fields!'
      }

      if (action.errorData === '401') {
        stateCopy.warningText = 'Invalid Username or password!'
      }

      return stateCopy
    }
    case (action.type === ON_REGISTER_ERROR): {
      let stateCopy = { ...state }
      stateCopy.warningText = action.errorData
      return stateCopy
    }
    default:
      return { ...state }
  }

}

export default LoginReducer 