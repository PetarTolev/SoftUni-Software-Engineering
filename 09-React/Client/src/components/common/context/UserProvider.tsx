
import React, { useState, useEffect, useContext } from 'react';
import { User } from '../../../models/User';
import { IUserContextProps } from './IUserContextProps';
import { IUserContextValues } from './IUserContextValues';

const UserContext = React.createContext<
  IUserContextValues | undefined
>(undefined);

export const UserProvider = ({
  children
}: IUserContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token');
    const id = window.localStorage.getItem('id');

    if (!String.isNullOrEmpty(username) && !String.isNullOrEmpty(token) && !String.isNullOrEmpty(id)) {
      setUser({
        username: username as string,
        token: token as string,
        id: id as string,
      });
    }
  }, [window.localStorage]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children}
    </UserContext.Provider >
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error();
  }

  return context;
}

export default UserProvider;