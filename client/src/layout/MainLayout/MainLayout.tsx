import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import {Header} from "../../components/Header/Header";
import './MainLayout.scss'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({
  children
}: MainLayoutProps) => {
  return (
    <div className={'layout'}>
      <Header />
      <div className={'layout__container'}>
        {children}
      </div>
      <Footer />
    </div>
  )
}