import React, {useState, useEffect, useContext} from 'react';
import { $t } from '../../lib/i18n';
import './Dashboard.scss'
import {Card} from "../../components/Card/Card";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {ICars} from "../../interfaces/carsInterface";
import {getAllCars} from "../../store/actions/Cars/carsActions";
import axios from 'axios'
import {IParts} from "../../interfaces/partsInterface";
import {Button} from "../../components/Button/Button";
import {AuthContext} from "../../context/AuthContext";

export const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars())
  }, []);

  const {role, userId} = useContext(AuthContext)

  const [parts, setParts] = useState<IParts[]>([])

  const cars = useSelector((state: any) => state.carsReducer.cars).map((item: ICars) => {
    return {
      value: item._id,
      label: `${item.brand} ${item.model}`
    }
  });

  const handleUpdateSelect = async (value: string) => {
    try {
      const response = await axios.post('/api/car/parts', {carId: value});

      setParts(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleReserveDetail = async (id: string) => {
    try {
      const response = await axios.put('/api/parts/reserve', {
        customerId: userId,
        partId: id
      })

      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={'Dashboard'}>

      <div className="page-title">
        {$t('Дашборд')}
      </div>

      {!role ?
        <Card title={'Доступные детали'}>
          <div>
            <Select
              options={cars}
              onChange={(data: any) => handleUpdateSelect(data.value)}
            />
          </div>
        </Card> : null
      }

      {!role ?
        <div className={'Dashboard__items'}>
          {parts?.map((item: IParts, index: number) => {
            if (item.status === 0) {
              return (
                <Card className={'fit-card'}>
                  <div key={index} className={'Dashboard__parts'}>
                    <div className={'Dashboard__parts_name'}>
                      {$t(item.name)}
                    </div>

                    <div className={'Dashboard__parts_price'}>
                      {$t(`${item.price} ₽`)}
                    </div>

                    <Button primary onClick={() => handleReserveDetail(item._id)}>
                      {$t('Забронировать деталь')}
                    </Button>
                  </div>
                </Card>
              )
            }
          })}
        </div> : null
      }
    </div>
  )
}