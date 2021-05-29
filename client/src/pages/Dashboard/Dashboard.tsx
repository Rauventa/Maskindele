import React from 'react';
import './Dashboard.scss'
import {Header} from "../../components/Header/Header";
import { Footer } from '../../components/Footer/Footer';

export const Dashboard = () => {
  return (
    <div className={'Dashboard'}>

      <Header />
      <h1>Hello Dashboard</h1>

      <Footer />
    </div>
  )
}