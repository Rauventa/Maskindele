import React, {useContext} from 'react';
import {$t} from "../../lib/i18n";
import {AuthContext} from "../../context/AuthContext";
import {Card} from "../../components/Card/Card";

export const Cabinet = () => {

  const {name, role} = useContext(AuthContext)

  return (
    <div className={'Cabinet'}>
      <div className="page-title">
        {$t(`${name} ${role ? 'Продавец' : 'Покупатель'}`)}
      </div>

      <Card title={'Ваши детали'}>
        <p>kjdslkfjsdlkf</p>
      </Card>
    </div>
  )
}