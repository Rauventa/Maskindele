import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input'
import { $t } from '../../lib/i18n';
import './SignIn.scss'
import {MainHeading} from "../../components/MainHeading/MainHeading";
import axios from 'axios'

export const SignIn = () => {

  const [loginValue, setLoginValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const onChangeLoginHandler = (value: string) => {
    setLoginValue(value)
  }

  const onChangePasswordHandler = (value: string) => {
    setPasswordValue(value)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/auth/registration', {
        email: 'rauventa@gmail.com',
        password: '1234567',
        repeat: '1234567'
      })

      console.log(response)
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
        value={loginValue}
        onChange={onChangeLoginHandler}
      />

      <button onClick={handleSubmit}>
        <p>Hello</p>
      </button>

      <Input
        type={'password'}
        placeholder={$t('Пароль')}
        value={passwordValue}
        onChange={onChangePasswordHandler}
      />

      <Button primary>
        {$t('Зарегистрироваться')}
      </Button>
    </div>
  )
}