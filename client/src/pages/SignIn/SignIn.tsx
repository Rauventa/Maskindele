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

      // const response = await axios.post('/api/user/registration', {
      //   name: 'Alex',
      //   surname: 'Alecto',
      //   phone: '88005553535',
      //   email: 'rauventa@gmail.com',
      //   password: '1234567',
      //   repeat: '1234567',
      //   role: 'seller'
      // })

      // const response = await axios.post('/api/car/create', {
      //   brand: 'BMW',
      //   model: 'X6',
      //   win: '98274398723948',
      //   year: '2018',
      //   description: 'Pizdataya ta4ka'
      // })

      // const response = await axios.post('/api/parts/create', {
      //   name: 'salo',
      //   vendor: '1',
      //   carId: '60b0054bf00d1f5b80a9acab'
      // })
      // //
      // const response = await axios.post('/api/order/create', {
      //   status: 0,
      //   userId: '60b017316dc0947181e9dc1c',
      //   parts: ['60b006ad9444605dc4c3028c', '60b017715853c8569dfb1a55']
      // })

      const response = await axios.post('/api/user/orders', {
        userId: '60b017316dc0947181e9dc1c'
      })


      // const response = await axios.get('/api/car/60b0054bf00d1f5b80a9acab')

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