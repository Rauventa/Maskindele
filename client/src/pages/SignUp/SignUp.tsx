import React, {useState} from 'react';
import {$t} from "../../lib/i18n";
import './SignUp.scss'
import {MainHeading} from "../../components/MainHeading/MainHeading";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

interface FormSignUpProps {
  name: string,
  surname: string,
  phone: string,
  email: string,
  password: string,
  repeat: string,
  role: string
}

interface SignUpProps {
  changeAuthType: (value: string) => void;
}

export const SignUp = ({
  changeAuthType
}: SignUpProps) => {

  const history = useHistory()

  const defaultFormState = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    repeat: '',
    role: 'seller'
  }

  const [formState, setFormState] = useState<FormSignUpProps>(defaultFormState);

  const updateFormHandler = (value: string, iterator: string) => {
    switch (iterator) {
      case 'name':
        setFormState(prev => {
          return {
            ...prev,
            name: value
          }
        })
        break;
      case 'surname':
        setFormState(prev => {
          return {
            ...prev,
            surname: value
          }
        })
        break;
      case 'phone':
        setFormState(prev => {
          return {
            ...prev,
            phone: value
          }
        })
        break;
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
      case 'repeat':
        setFormState(prev => {
          return {
            ...prev,
            repeat: value
          }
        })
        break;
      case 'role':
        setFormState(prev => {
          return {
            ...prev,
            role: value
          }
        })
        break;
    }
  }

  const sendDataHandler = async () => {
    try {
      await axios.post('/api/user/registration', formState);

      history.push('/signin')
    } catch (e) {
      console.log(e)
    }
  }

  console.log(formState)

  return (
    <div className={'SignUp'}>

      <MainHeading>
        {$t('Регистрация')}
      </MainHeading>

      <Input
        type={'text'}
        placeholder={$t('Name')}
        value={formState.name}
        onChange={(value) => updateFormHandler(value, 'name')}
      />

      <Input
        type={'text'}
        placeholder={$t('Surname')}
        value={formState.surname}
        onChange={(value) => updateFormHandler(value, 'surname')}
      />

      <Input
        type={'tel'}
        placeholder={$t('Phone')}
        value={formState.phone}
        onChange={(value) => updateFormHandler(value, 'phone')}
      />

      <Input
        type={'email'}
        placeholder={$t('E-mail')}
        value={formState.email}
        onChange={(value) => updateFormHandler(value, 'email')}
      />

      <Input
        type={'password'}
        placeholder={$t('Password')}
        value={formState.password}
        onChange={(value) => updateFormHandler(value, 'password')}
      />

      <Input
        type={'password'}
        placeholder={$t('Repeat password')}
        value={formState.repeat}
        onChange={(value) => updateFormHandler(value, 'repeat')}
      />

      <Button primary onClick={sendDataHandler}>
        {$t('Зарегистрироваться')}
      </Button>

      <p onClick={() => changeAuthType('login')}>Уже есть аккаунт? Войти</p>
    </div>
  )
}