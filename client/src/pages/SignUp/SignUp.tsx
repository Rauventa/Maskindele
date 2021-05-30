import React, {useState} from 'react';
import {$t} from "../../lib/i18n";
import './SignUp.scss'
import {MainHeading} from "../../components/MainHeading/MainHeading";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import axios from 'axios'
import {Checkbox} from "../../components/Checkbox/Checkbox";

interface FormSignUpProps {
  name: string,
  surname: string,
  phone: string,
  email: string,
  password: string,
  repeat: string,
  role: boolean
}

interface SignUpProps {
  changeAuthType: (value: string) => void;
}

export const SignUp = ({
  changeAuthType
}: SignUpProps) => {

  const defaultFormState = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    repeat: '',
    role: false
  }

  const [formState, setFormState] = useState<FormSignUpProps>(defaultFormState);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        setFormState((prev: any) => {
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

      changeAuthType('login')

      setErrorMessage('')
    } catch (e) {
      setErrorMessage(e.response.data.message)
    }
  }

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

      <Checkbox checked={formState.role} onChange={(value: any) => updateFormHandler(value, 'role')}>
        {$t('Я продавец')}
      </Checkbox>

      <Button primary onClick={sendDataHandler}>
        {$t('Зарегистрироваться')}
      </Button>

      <div className={'SignUp__additional'}>
        <div className="secondary-text">
          {$t('Уже есть аккаунт?')}
        </div>
        <div className="link-text" onClick={() => changeAuthType('login')}>
          {$t('Войти')}
        </div>
      </div>

      {errorMessage !== '' ?
        <div className={'SignUp__errors'}>
          {errorMessage}
        </div> : null
      }
    </div>
  )
}