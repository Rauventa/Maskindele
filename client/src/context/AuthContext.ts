import {createContext} from 'react';

function noopLogin(token: string, userId: string, userName: string, userRole: string) {}
function noopLogout() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noopLogin,
  logout: noopLogout,
  isAuth: false,
  name: null,
  role: false
})