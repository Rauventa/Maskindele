import React from 'react';
import { $t } from '../../lib/i18n';
import './Dashboard.scss'

export const Dashboard = () => {
  return (
    <div className={'Dashboard'}>

      <div className="page-title">
        {$t('Дашборд')}
      </div>

    </div>
  )
}