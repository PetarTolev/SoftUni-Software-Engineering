import { User } from '../../../models/User';

export interface IUserContextValues {
  user: User | null;
  setUser: (user: User | null) => void;
}
