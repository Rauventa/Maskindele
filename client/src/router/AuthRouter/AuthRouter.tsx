import React from 'react';
import {AuthPage} from "../../pages/AuthPage/AuthPage";
import {Route} from "react-router-dom";

export const AuthRouter = () => {
  return (
    <Route path={'/auth'}>
      <AuthPage />
    </Route>
  )
}