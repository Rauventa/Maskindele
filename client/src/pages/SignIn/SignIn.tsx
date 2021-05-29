import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input'
import { $t } from '../../lib/i18n';
import './SignIn.scss'
import {MainHeading} from "../../components/MainHeading/MainHeading";
import axios from 'axios'
import {useHistory} from "react-router-dom";

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

  const defaultFormState = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState<FormSignInProps>(defaultFormState);

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

      localStorage.setItem('userName', response.data.name + " " + response.data.surname);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      history.push('/')
    } catch (e) {
      console.log(e)
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

      <p onClick={() => changeAuthType('registration')}>Еще нет аккаунта? Зарегестрироваться</p>
    </div>
  )
}