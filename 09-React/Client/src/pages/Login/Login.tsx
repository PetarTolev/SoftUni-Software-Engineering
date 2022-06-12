import styles from './Login.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import HttpService from '../../services/HttpService';
import { ChangeEvent, FocusEvent } from 'react';
import { UserResponseModel } from '../../models/UserResponseModel';
import { ErrorResponseModel } from '../../models/ErrorResponseModel';
import { FieldData } from '../../shared/FieldData';
import { Errors } from '../../shared/constants';
import { useUserContext } from '../../components/common/context/UserProvider';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes/routes';
import { IActionsMap } from './IActionsMap';

const initialState: FieldData<string> = {
  value: '',
  errorMessage: undefined,
  hasError: false
}

const Login = () => {
  const [email, setLogin] = useState<FieldData<string>>(initialState);
  const [password, setPassword] = useState<FieldData<string>>(initialState);

  const { setUser } = useUserContext();
  const history = useHistory();

  const actionsMap: IActionsMap = {
    'email': setLogin,
    'password': setPassword,
  };

  const httpService = new HttpService();

  const handleSubmit = () => {
    if (
      String.isNullOrEmpty(email.value)
      || String.isNullOrEmpty(password.value)
      || email.hasError
      || password.hasError
    ) {
      return;
    }

    httpService
      .post('users/login', JSON.stringify({
        login: email.value,
        password: password.value
      }))
      .then((result: any) => {
        const model = result as UserResponseModel;

        window.localStorage.setItem('username', model.firstName);
        window.localStorage.setItem('token', model['user-token']);
        window.localStorage.setItem('id', model.objectId);

        setUser({
          username: model.firstName,
          token: model['user-token'],
          id: model.objectId,
        });
        history.push(Routes.offers.getPath());
      })
      .catch((error: ErrorResponseModel) => console.log(error.message));
  }

  const handleInputChange = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>
  ) => {
    actionsMap[name]?.call(
      undefined,
      { value, errorMessage: undefined, hasError: false }
    );
  }

  const handleInputBlur = (
    { target: { name, value } }: FocusEvent<HTMLInputElement>
  ) => {
    if (String.isNullOrEmpty(value)) {
      actionsMap[name]?.call(
        undefined,
        (prevState) => ({ ...prevState, errorMessage: Errors.Required, hasError: true })
      );
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <TextField
        required
        className={styles.input}
        name={'email'}
        label={'Email'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={email.hasError}
        helperText={email.errorMessage}
      />
      <TextField
        required
        className={styles.input}
        name={'password'}
        label={'Password'}
        type={'password'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={password.hasError}
        helperText={password.errorMessage}
      />

      <Button
        variant={'contained'}
        color={'primary'}
        className={styles.btn}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;

