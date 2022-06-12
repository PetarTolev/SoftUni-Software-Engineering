export enum RegisterActionTypes {
  SET_INPUT_FIELD = 'SET_INPUT_FIELD',
  SET_ERROR = 'SET_ERROR',
};

export type SetInputFieldAction = {
  type: RegisterActionTypes.SET_INPUT_FIELD,
  payload: {
    target: string;
    value: string;
  }
};

export const setInputField = (
  target: string,
  value: string,
): SetInputFieldAction => ({
  type: RegisterActionTypes.SET_INPUT_FIELD,
  payload: {
    target,
    value,
  }
});

export type SetErrorAction = {
  type: RegisterActionTypes.SET_ERROR,
  payload: {
    target: string,
    error: string,
  }
}

export const setError = (
  target: string,
  error: string
): SetErrorAction => {
  return {
    type: RegisterActionTypes.SET_ERROR,
    payload: {
      target,
      error,
    }
  }
};

export type RegisterActions =
  | SetInputFieldAction
  | SetErrorAction;