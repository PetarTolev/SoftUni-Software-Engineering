import styles from './Register.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ChangeEvent, FocusEvent, useReducer } from 'react';
import { ErrorResponseModel } from '../../models/ErrorResponseModel';
import HttpService from '../../services/HttpService';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes/routes';
import { registerReducer } from './state/RegisterReducer';
import { setError, setInputField } from './state/RegisterActions'
import { RegisterModel } from './state/RegisterModel';
import { Errors } from '../../shared/constants';

export const initialState: RegisterModel = {
  firstName: {
    value: '',
    hasError: false,
    errorMessage: undefined,
  },
  lastName: {
    value: '',
    hasError: false,
    errorMessage: undefined,
  },
  email: {
    value: '',
    hasError: false,
    errorMessage: undefined,
  },
  password: {
    value: '',
    hasError: false,
    errorMessage: undefined,
  },
  confirmPassword: {
    value: '',
    hasError: false,
    errorMessage: undefined,
  }
};

const Register = () => {
  const history = useHistory();

  const [state, dispatch] = useReducer(
    registerReducer,
    initialState
  );

  const httpService = new HttpService();

  const handleSubmit = () => {
    if (Object.values(state).filter(x => x.hasError).length > 0) {
      return;
    }

    const { firstName, lastName, email, password } = state;

    const data = JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });

    httpService
      .post('users/register', data)
      .then(() => {
        history.push(Routes.login.getPath());
      })
      .catch((error: ErrorResponseModel) => console.log(error.message));
  }

  const handleInputChange = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setInputField(name, value));
  }

  const handleInputBlur = (
    { target: { name, value } }: FocusEvent<HTMLInputElement>
  ) => {
    if (String.isNullOrEmpty(value)) {
      dispatch(setError(name, Errors.Required));
    }
  }

  const handleConfirmPasswordChange = (
    { target: { name, value } }: FocusEvent<HTMLInputElement>
  ) => {
    if (String.isNullOrEmpty(value)) {
      dispatch(setError(name, Errors.Required));
    } else if (value !== state.password.value) {
      dispatch(setError(name, Errors.PasswordsNotMatch));
    }
  }

  return (
    <div className={styles.registerWrapper}>
      <TextField
        required
        className={styles.input}
        label={'First Name'}
        name={'firstName'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={state.firstName.hasError}
        helperText={state.firstName.errorMessage}
        value={state.firstName.value}
      />
      <TextField
        required
        className={styles.input}
        label={'Last Name'}
        name={'lastName'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={state.lastName.hasError}
        helperText={state.lastName.errorMessage}
        value={state.lastName.value}
      />
      <TextField
        required
        className={styles.input}
        label={'Email'}
        name={'email'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={state.email.hasError}
        helperText={state.email.errorMessage}
        value={state.email.value}
      />
      <TextField
        required
        className={styles.input}
        label={'Password'}
        type={'password'}
        name={'password'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={state.password.hasError}
        helperText={state.password.errorMessage}
        value={state.password.value}
      />
      <TextField
        required
        className={styles.input}
        label={'Confirm Password'}
        type={'password'}
        name={'confirmPassword'}
        onChange={handleInputChange}
        onBlur={handleConfirmPasswordChange}
        error={state.confirmPassword.hasError}
        helperText={state.confirmPassword.errorMessage}
        value={state.confirmPassword.value}
      />

      <Button
        className={styles.btn}
        variant={'contained'}
        color={'primary'}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </div>
  );
}

export default Register;
