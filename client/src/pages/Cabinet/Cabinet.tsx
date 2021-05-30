import React, {useState, useEffect, useContext} from 'react';
import {$t} from "../../lib/i18n";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from 'react-redux';
import {Card} from "../../components/Card/Card";
import './Cabinet.scss'
import {Button} from "../../components/Button/Button";
import {getAllParts} from "../../store/actions/Parts/partsActions";
import {IParts} from "../../interfaces/partsInterface";
import {Table} from "../../components/Table/Table";


export const Cabinet = () => {

  const {name, role} = useContext(AuthContext);

  const dispatch = useDispatch();

  const {userId} = useContext(AuthContext)

  useEffect(() => {
    dispatch(getAllParts(userId))
  }, []);

  const parts = useSelector((state: any) => state.partsReducer.parts);

  const partsTableColumns = [
    {
      Header: 'Название детали',
      accessor: 'name',
    },
    {
      Header: 'Автомобиль',
      accessor: 'car',
    },
    {
      Header: 'Цена',
      accessor: 'price',
    },
  ]

  const partsTableData = parts?.map((item: IParts) => {
    return {
      name: item.name,
      car: `${item.car.brand} ${item.car.model}`,
      price: item.price
    }
  })

  //TODO - сделать компонент на каждую карточку -- и перевести данные в таблицу дя каждого типа

  //TODO - на перезагрузке - редирект, убрать используя useState - впихнуть его в useEffect

  return (
    <div className={'Cabinet'}>
      <div className="Cabinet__header">
        <div className="page-title">
          {$t(`${name}, ${role ? 'Продавец' : 'Покупатель'}`)}
        </div>

        <Button href={'/sold'} primary>
          {$t('Продать деталь')}
        </Button>
      </div>

      <div className="Cabinet__container">
        <Card title={'На продаже'}>
          <div>
            {parts?.map((item: IParts, index: number) => {
              if (item.status === 0) {
                return (
                  <div key={index}>
                    {$t(`${item.name} за ${item.price} на ${item.car.brand} ${item.car.model}`)}
                  </div>
                )
              }
            })}
          </div>
        </Card>

        <Card title={'Ожидают подтверждения'}>
          {parts?.map((item: IParts, index: number) => {
            if (item.status === 1) {
              return (
                <div key={index}>
                  {$t(`${item.name} за ${item.price}`)}
                </div>
              )
            }
          })}
        </Card>

        <Card title={'Продано'}>
          {parts?.map((item: IParts, index: number) => {
            if (item.status === 2) {
              return (
                <div key={index}>
                  {$t(`${item.name} за ${item.price}`)}
                </div>
              )
            }
          })}
        </Card>

        <Card>
          <Table
            tableColumns={partsTableColumns}
            tableData={partsTableData}
          />
        </Card>
      </div>
    </div>
  )
}