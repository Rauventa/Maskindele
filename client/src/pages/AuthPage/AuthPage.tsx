import React, {useState} from 'react';
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {SignIn} from "../SignIn/SignIn";
import {SignUp} from "../SignUp/SignUp";
import './AuthPage.scss'

export const AuthPage = () => {

  const [page, setPage] = useState<string>('login');

  const handleChangeAuth = (type: string) => {
    setPage(type)
  }

  return (
    <div className={'AuthPage'}>
      <Header />

      <div className={'AuthPage__content'}>
        {page === 'login' ?
          <SignIn
            changeAuthType={handleChangeAuth}
          /> :
          <SignUp
            changeAuthType={handleChangeAuth}
          />
        }
      </div>

      <Footer />
    </div>
  )
}