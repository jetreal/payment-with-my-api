import { connect } from 'react-redux';
import Register from './Register';
import { onSubmitRegisterAsync, onClearFromWarning } from '../../../redux/actions';
import { fetchAllSystemUsersAsync } from '../../../redux/actions/mainActions';


let mapStateToProps = (state) => {
  return {
    allSystemUsers: state.MainReducer.allSystemUsers,
    LoginState: state.LoginReducer,
    form: state.form.login
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  {
    onSubmitRegisterAsync,
    onClearFromWarning,
    fetchAllSystemUsersAsync
  }
)(Register)

export default RegisterContainer

