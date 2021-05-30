import React, {useContext, useState} from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input'
import { $t } from '../../lib/i18n';
import './SignIn.scss'
import {MainHeading} from "../../components/MainHeading/MainHeading";
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

interface FormSignInProps {
  email: string,
  password: string,
}

interface SignInProps {
  changeAuthType: (value: string) => void;
}

export const SignIn = ({
  changeAuthType
}: SignInProps) => {

  const history = useHistory()

  const {login} = useContext(AuthContext)

  const defaultFormState = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState<FormSignInProps>(defaultFormState);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateFormHandler = (value: string, iterator: string) => {
    switch (iterator) {
      case 'email':
        setFormState(prev => {
          return {
            ...prev,
            email: value
          }
        })
        break;
      case 'password':
        setFormState(prev => {
          return {
            ...prev,
            password: value
          }
        })
        break;
    }
  }

  const sendDataHandler = async () => {
    try {
      const response = await axios.post(`/api/user/login`, formState);

      const name = `${response.data.name} ${response.data.surname}`
      login(response.data.token, response.data.userId, name, response.data.role)

      setErrorMessage('')

      history.push('/')
    } catch (e) {
      setErrorMessage(e.response.data.message)
    }
  }

  return (
    <div className="SignIn">

      <MainHeading>
        {$t('Вход')}
      </MainHeading>

      <Input
        type={'email'}
        placeholder={$t('E-mail')}
        value={formState.email}
        onChange={(value) => updateFormHandler(value, 'email')}
      />

      <Input
        type={'password'}
        placeholder={$t('Пароль')}
        value={formState.password}
        onChange={(value) => updateFormHandler(value, 'password')}
      />

      <Button primary onClick={sendDataHandler}>
        {$t('Войти')}
      </Button>

      <div className={'SignIn__additional'}>
        <div className="secondary-text">
          {$t('Еще нет аккаунта?')}
        </div>
        <div className="link-text" onClick={() => changeAuthType('registration')}>
          {$t('Зарегестрироваться')}
        </div>
      </div>

      {errorMessage !== '' ?
        <div className={'SignIn__errors'}>
          {errorMessage}
        </div> : null
      }
    </div>
  )
}