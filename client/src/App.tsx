import React from 'react';
import './styles/main.scss'
import {RootRouter} from "./router/RootRouter/RootRouter";
import { AuthContext } from './context/AuthContext';
import {useAuth} from "./hooks/auth.hook";
import {MainLayout} from "./layout/MainLayout/MainLayout";

export const App = () => {
  const {token, login, logout, userId, name, role} = useAuth()
  const isAuth = !!token

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth, name, role
    }}>
      <MainLayout>
        <RootRouter
          isAuth={isAuth}
        />
      </MainLayout>
    </AuthContext.Provider>
  )
}