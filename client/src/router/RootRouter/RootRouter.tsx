import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Page404} from "../../pages/404/Page404";
import {Dashboard} from "../../pages/Dashboard/Dashboard";
import {AuthRouter} from "../AuthRouter/AuthRouter";

interface RootRouterProps {

}

export const RootRouter = ({
}: RootRouterProps) => {

  const isAuth = !!localStorage.getItem('userId');

  return (
    <Switch>
      {isAuth ?
        <>
          <Route path={'/'} exact>
            <Dashboard />
          </Route>
          <Route path={'*'}>
            <Page404 />
          </Route>
        </> :
        <>
          <AuthRouter />
          <Redirect to={'/auth'} />
        </>
      }
    </Switch>
  )
}