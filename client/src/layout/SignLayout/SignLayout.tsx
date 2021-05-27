import React from 'react';
import './SignLayout.scss'
import { Header } from "../../components/Header/Header";
import { Footer } from '../../components/Footer/Footer';

interface SignLayoutProps {
  children: React.ReactNode
}

export const SignLayout = ({
  children
}: SignLayoutProps) => {
  return (
    <div className={'SignLayout'}>
      <Header />

      <div className={'SignLayout__content'}>
        {children}
      </div>

      <Footer />
    </div>
  )
}