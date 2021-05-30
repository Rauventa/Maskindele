import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import './Header.scss'
import {$t} from "../../lib/i18n";
import {AuthContext} from "../../context/AuthContext";

interface HeaderProps {

}

export const Header = ({

}: HeaderProps) => {

  const {logout, isAuth} = useContext(AuthContext)

  const history = useHistory();

  const logoutHandler = () => {
    logout()
    history.push('/auth')
  }

  return (
    <header className={'header'}>
      <div className={'header__logo'}>
        <NavLink to={'/'} exact className={'header-link'}>
          {$t('Maskindele')}
        </NavLink>
      </div>
      {isAuth ?
        <div className="header__navigation">
          <NavLink to={'/cabinet'} className={'header-link'}>
            {$t('Кабинет')}
          </NavLink>
          <div className={'header-link'} onClick={logoutHandler}>
            {$t('Выйти')}
          </div>
        </div> :
        <div className="header__navigation">
          <NavLink to={'/auth'} className={'header-link'}>
            {$t('Авторизация')}
          </NavLink>
        </div>
      }
    </header>
  )
}