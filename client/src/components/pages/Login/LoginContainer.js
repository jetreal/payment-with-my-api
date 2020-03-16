import { connect } from 'react-redux';
import Login from './Login';
import { onSubmitLoginAsync, onClearFromWarning } from '../../../redux/actions';

let mapStateToProps = (state) => {

  return {
    LoginState: state.LoginReducer,
    form: state.form.login
  }
}

const CenterContainer = connect(
  mapStateToProps,
  {
    onSubmitLoginAsync,
    onClearFromWarning
  }
)(Login)

export default CenterContainer

