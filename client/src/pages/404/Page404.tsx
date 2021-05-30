import React from 'react';
import { Button } from '../../components/Button/Button';
import { $t } from '../../lib/i18n';
import {useHistory} from "react-router-dom";
import './Page404.scss'

export const Page404 = () => {

  const history = useHistory();

  const handleSubmit = () => {
    history.goBack()
  }

  return (
    <div className={'page-404'}>

      <div className="page-404__title">
        <div className="page-404__title_primary">
          {$t('404')}
        </div>
        <div className="page-404__title_secondary">
          {$t('Страница не найдена')}
        </div>
      </div>

      <div className="page-404__buttons">
        <Button primary onClick={handleSubmit}>
          {$t('Вернуться обратно')}
        </Button>
      </div>
    </div>
  )
}