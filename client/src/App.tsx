import React from 'react';
import './styles/main.scss'
import {RootRouter} from "./router/RootRouter/RootRouter";
import {SignLayout} from "./layout/SignLayout/SignLayout";

export const App = () => (
  <SignLayout>
    <RootRouter />
  </SignLayout>
)