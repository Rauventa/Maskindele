import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Page404} from "../../pages/404/Page404";
import {Dashboard} from "../../pages/Dashboard/Dashboard";
import {AuthPage} from "../../pages/AuthPage/AuthPage";
import { Cabinet } from '../../pages/Cabinet/Cabinet';
import {SoldPartPage} from "../../pages/SoldPartPage/SoldPartPage";

interface RootRouterProps {
  isAuth: boolean
}

export const RootRouter = ({
  isAuth,
}: RootRouterProps) => {

  if (isAuth) {
    return (
      <Switch>
        <Route path={'/'} exact>
          <Dashboard />
        </Route>
        <Route path={'/cabinet'}>
          <Cabinet />
        </Route>
        <Route path={'/sold'}>
          <SoldPartPage />
        </Route>
        <Route path={'*'}>
          <Page404 />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path={'/auth'}>
          <AuthPage />
        </Route>
        <Route path={'*'}>
          <Page404 />
        </Route>
      </Switch>
    )
  }
}