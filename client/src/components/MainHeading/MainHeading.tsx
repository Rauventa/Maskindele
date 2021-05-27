import React from 'react';
import './MainHeading.scss';

interface MainHeadingProps {
  children: React.ReactNode
}

export const MainHeading = ({children} : MainHeadingProps) => {
  return (
    <div className={'MainHeading'}>
      {children}
    </div>
  )
}