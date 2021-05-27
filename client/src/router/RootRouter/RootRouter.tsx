import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from '../../pages/SignIn/SignIn';

export const RootRouter = () => {
  return (
    <Switch>
      <Route path={'/'} exact>
        <SignIn />
      </Route>
    </Switch>
  )
}