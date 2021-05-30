import React, {useState, useEffect} from 'react';
import {Card} from "../../../components/Card/Card";
import { Table } from '../../../components/Table/Table';
import {IParts} from "../../../interfaces/partsInterface";

interface SoldCabinetCarsProps {
  parts: IParts[],
  status: number
}

export const SoldCabinetCars = ({
  parts, status
}: SoldCabinetCarsProps) => {

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const additionalData = [...parts];
    const filtered = additionalData.filter((item: IParts) => item.status === status).map((item: IParts) => {
      return {
        name: item.name,
        car: `${item.car.brand} ${item.car.model}`,
        price: `${item.price} ₽`
      }
    })

    setData(filtered)
  }, [parts, status]);

  const tableColumns: any = [
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
    }
  ]

  return (
    <Card
      title={'Продано'}
      className={'table-card'}
    >
      <Table
        tableColumns={tableColumns}
        tableData={data}
      />
    </Card>
  )
}