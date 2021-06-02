import React, {useEffect, useContext} from 'react';
import {$t} from "../../lib/i18n";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from 'react-redux';
import './Cabinet.scss'
import {Button} from "../../components/Button/Button";
import {getCustomerParts, getUserParts} from "../../store/actions/Parts/partsActions";
import {BuyCabinetCars} from "./components/BuyCabinetCars";
import {ApproveCabinetCars} from "./components/ApproveCabinetCars";
import {SoldCabinetCars} from "./components/SoldCabinetCars";


export const Cabinet = () => {

  const dispatch = useDispatch();

  const {userId, name, role} = useContext(AuthContext)

  console.log(userId)

  useEffect(() => {
    if (role) {
      dispatch(getUserParts(userId))
    } else {
      dispatch(getCustomerParts(userId))
    }
  }, []);

  const parts = useSelector((state: any) => state.partsReducer.parts);
  const customerParts = useSelector((state: any) => state.partsReducer.customerParts);

  return (
    <div className={'Cabinet'}>
      <div className="Cabinet__header">
        <div className="page-title">
          {$t(`${name}, ${role ? 'Продавец' : 'Покупатель'}`)}
        </div>

        {role ?
          <Button href={'/sold'} primary>
            {$t('Выставить деталь на продажу')}
          </Button> : null
        }
      </div>

      {role ?
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
        </div> :
        <div className="Cabinet__container">
          <ApproveCabinetCars
            parts={customerParts}
            status={1}
          />

          <SoldCabinetCars
            parts={customerParts}
            status={2}
          />
        </div>
      }
    </div>
  )
}