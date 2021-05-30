import React, {useState} from 'react';
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
    </div>
  )
}