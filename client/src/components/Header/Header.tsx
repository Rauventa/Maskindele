import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import './Header.scss'
import {$t} from "../../lib/i18n";
interface HeaderProps {

}

export const Header = ({

}: HeaderProps) => {

  const isAuth = !!localStorage.getItem('userId');

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

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
        <div className="header__navigation" onClick={logoutHandler}>
          <div className={'header-link'}>
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