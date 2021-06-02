import React, {useState, useEffect, useContext} from 'react';
import {useDispatch} from "react-redux";
import {Card} from "../../../components/Card/Card";
import { Table } from '../../../components/Table/Table';
import {IParts} from "../../../interfaces/partsInterface";
import { $t } from '../../../lib/i18n';
import {Button} from "../../../components/Button/Button";
import axios from 'axios';
import {getUserParts} from "../../../store/actions/Parts/partsActions";
import {AuthContext} from "../../../context/AuthContext";

interface ApproveCabinetCarsProps {
  parts: IParts[],
  status: number,
}

export const ApproveCabinetCars = ({
  parts, status
}: ApproveCabinetCarsProps) => {

  const dispatch = useDispatch()

  const [data, setData] = useState<any>([]);

  const {userId, role} = useContext(AuthContext)

  useEffect(() => {
    const additionalData = [...parts];

    if (role) {
      const filtered = additionalData.filter((item: IParts) => item.status === status).map((item: IParts) => {
        return {
          id: item._id,
          name: item.name,
          car: `${item.car.brand} ${item.car.model}`,
          price: `${item.price} ₽`,
          customer: {
            name: `${item.customer?.name} ${item.customer?.surname}`,
            phone: item.customer?.phone
          },
        }
      })

      setData(filtered)
    } else {
      const filtered = additionalData.filter((item: IParts) => item.status === status).map((item: IParts) => {
        return {
          id: item._id,
          name: item.name,
          car: `${item.car.brand} ${item.car.model}`,
          price: `${item.price} ₽`,
          owner: {
            name: `${item.owner?.name} ${item.owner?.surname}`,
            phone: item.owner?.phone
          },
        }
      })

      setData(filtered)
    }
  }, [parts, status]);

  const soldHandler = async (id: string) => {
    try {
      await axios.put(`/api/parts/sold/${id}`)
      dispatch(getUserParts(userId))
    } catch (e) {
      console.log(e)
    }
  }

  const customerColumns: any = [
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
    {
      id: 'owner',
      Header: 'Продавец',
      accessor: 'owner',
      Cell: ({value}: any) => (
        <div>
          <div>
            {$t(value.name)}
          </div>
          <a href={`tel:${value.phone}`}>{value.phone}</a>
        </div>
      )
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      Cell: ({row}: any) => (
        <Button primary>
          {$t('Отменить подтверждение')}
        </Button>
      )
    },
  ]

  const sellerColumns: any = [
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
    {
      id: 'customer',
      Header: 'Покупатель',
      accessor: 'customer',
      Cell: ({value}: any) => (
        <div>
          <div>
            {$t(value.name)}
          </div>
          <a href={`tel:${value.phone}`}>{value.phone}</a>
        </div>
      )
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      Cell: ({row}: any) => (
        <Button primary onClick={() => soldHandler(row.original.id)}>
          {$t('Продать')}
        </Button>
      )
    },
  ]

  return (
    <Card
      title={'Ожидают подтверждения'}
      className={'table-card'}
    >
      <Table
        tableColumns={role ? sellerColumns : customerColumns}
        tableData={data}
      />
    </Card>
  )
}