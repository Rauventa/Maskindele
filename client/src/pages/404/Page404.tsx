import React from 'react';
import { Button } from '../../components/Button/Button';
import { $t } from '../../lib/i18n';
import {useHistory} from "react-router-dom";

export const Page404 = () => {

  const history = useHistory();

  const handleSubmit = () => {
    history.goBack()
  }

  return (
    <div>
      <h1>404</h1>

      <Button primary onClick={handleSubmit}>
        {$t('Go back')}
      </Button>
    </div>
  )
}