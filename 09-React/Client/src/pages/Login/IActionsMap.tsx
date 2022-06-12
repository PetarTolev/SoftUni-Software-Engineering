import { Dispatch, SetStateAction } from 'react';
import { FieldData } from '../../shared/FieldData';

export interface IActionsMap {
  [key: string]: Dispatch<SetStateAction<FieldData<string>>>;
}
