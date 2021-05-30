import React, {useEffect, useContext} from 'react';
import {$t} from "../../lib/i18n";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from 'react-redux';
import './Cabinet.scss'
import {Button} from "../../components/Button/Button";
import {getUserParts} from "../../store/actions/Parts/partsActions";
import {BuyCabinetCars} from "./components/BuyCabinetCars";
import {ApproveCabinetCars} from "./components/ApproveCabinetCars";
import {SoldCabinetCars} from "./components/SoldCabinetCars";


export const Cabinet = () => {

  const dispatch = useDispatch();

  const {userId, name, role} = useContext(AuthContext)

  useEffect(() => {
    dispatch(getUserParts(userId))
  }, []);

  const parts = useSelector((state: any) => state.partsReducer.parts);

  return (
    <div className={'Cabinet'}>
      <div className="Cabinet__header">
        <div className="page-title">
          {$t(`${name}, ${role ? 'Продавец' : 'Покупатель'}`)}
        </div>

        <Button href={'/sold'} primary>
          {$t('Выставить деталь на продажу')}
        </Button>
      </div>

      <div className="Cabinet__container">
        <BuyCabinetCars
          parts={parts}
          status={0}
        />

        <ApproveCabinetCars
          parts={parts}
          status={1}
        />

        <SoldCabinetCars
          parts={parts}
          status={2}
        />
      </div>
    </div>
  )
}