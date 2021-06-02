import React, {useState, useEffect, useContext} from 'react';
import {Card} from "../../../components/Card/Card";
import { Table } from '../../../components/Table/Table';
import {IParts} from "../../../interfaces/partsInterface";
import {$t} from "../../../lib/i18n";
import {AuthContext} from "../../../context/AuthContext";

interface SoldCabinetCarsProps {
  parts: IParts[],
  status: number
}

export const SoldCabinetCars = ({
  parts, status
}: SoldCabinetCarsProps) => {

  const [data, setData] = useState<any>([]);

  const {role} = useContext(AuthContext)

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
  ]

  return (
    <Card
      title={role ? 'Продано' : 'Куплено'}
      className={'table-card'}
    >
      <Table
        tableColumns={role ? sellerColumns : customerColumns}
        tableData={data}
      />
    </Card>
  )
}