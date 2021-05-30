import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux';

import {$t} from "../../lib/i18n";
import {Card} from "../../components/Card/Card";
import {getAllCars} from "../../store/actions/Cars/carsActions";
import {ICars} from "../../interfaces/carsInterface";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";

import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";

interface IFormSoldState {
  car: string,
  name: string,
  vendor: string,
  price: number
}

export const SoldPartPage = ({

}) => {

  const defaultFormState: IFormSoldState = {
    car: '',
    name: '',
    vendor: '',
    price: 0
  }

  const [formState, setFormState] = useState<IFormSoldState>(defaultFormState)

  const dispatch = useDispatch();

  const {userId} = useContext(AuthContext)

  useEffect(() => {
    dispatch(getAllCars())
  }, []);

  const cars = useSelector((state: any) => state.carsReducer.cars).map((item: ICars) => {
    return {
      value: item._id,
      label: `${item.brand} ${item.model}`
    }
  });

  const updateFormHandler = (value: string | number, selector: string) => {
    switch (selector) {
      case 'car':
        setFormState((prev: any) => {
          return {
            ...prev,
            car: value
          }
        })
        break;
      case 'name':
        setFormState((prev: any) => {
          return {
            ...prev,
            name: value
          }
        })
        break;
      case 'vendor':
        setFormState((prev: any) => {
          return {
            ...prev,
            vendor: value
          }
        })
        break;
      case 'price':
        setFormState((prev: any) => {
          return {
            ...prev,
            price: value
          }
        })
        break;
    }
  }

  const sendDataHandler = async () => {
    try {
      await axios.post('/api/parts/create', {
        ...formState,
        owner: userId
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={'SoldPartPage'}>
      <div className="SoldPartPage__header">
        <div className="page-title">
          {$t('Выставить деталь на продажу')}
        </div>
      </div>
      <div className="SoldPartPage__content">
        <Card>
          <div>
            <Select
              options={cars}
              selected={formState.car}
              onChange={(data: any) => updateFormHandler(data.value, 'car')}
            />

            <Input
              type={'text'}
              placeholder={$t('Название детали')}
              value={formState.name}
              onChange={(value) => updateFormHandler(value, 'name')}
            />

            <Input
              type={'text'}
              placeholder={$t('Артикул')}
              value={formState.vendor}
              onChange={(value) => updateFormHandler(value, 'vendor')}
            />


            <Input
              type={'number'}
              placeholder={$t('Цена детали')}
              value={formState.price}
              onChange={(value) => updateFormHandler(value, 'price')}
            />

            <Button onClick={sendDataHandler} primary>
              {$t('Выставить на продажу')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}