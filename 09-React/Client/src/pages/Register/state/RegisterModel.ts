import { FieldData } from '../../../shared/FieldData'

export type RegisterModel = {
  firstName: FieldData<string>;
  lastName: FieldData<string>;
  email: FieldData<string>;
  password: FieldData<string>;
  confirmPassword: FieldData<string>;
};
