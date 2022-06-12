import { RegisterModel } from './RegisterModel'
import { RegisterActions, RegisterActionTypes } from './RegisterActions';
export const registerReducer = (
  state: RegisterModel,
  action: RegisterActions
) => {
  switch (action.type) {
    case RegisterActionTypes.SET_INPUT_FIELD:
      return {
        ...state,
        [action.payload.target]: {
          value: action.payload.value,
          errorMessage: undefined,
          hasError: false,
        }
      }
    case RegisterActionTypes.SET_ERROR:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target as keyof RegisterModel],
          errorMessage: action.payload.error,
          hasError: true,
        }
      }
    default:
      return { ...state };
  }
}
