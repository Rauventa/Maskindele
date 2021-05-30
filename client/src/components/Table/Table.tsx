import React from 'react';
import { useTable } from 'react-table';
import { $t } from '../../lib/i18n';
import './Table.scss'

interface TableProps {
  tableColumns: any,
  tableData: any,
}

export const Table = ({
  tableColumns,
  tableData,
}: TableProps) => {

  const data = [...tableData]

  const columns: any = React.useMemo(() => [...tableColumns], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div className={'table'}>
      <table {...getTableProps()} >
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}


        {/*TODO -- warning console*/}
        {!rows.length ?
          <div className={'table-no-data'}>
            {$t('Нет данных')}
          </div> : null
        }
        </tbody>
      </table>
    </div>
  )
}