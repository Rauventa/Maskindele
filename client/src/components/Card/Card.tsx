import React from 'react';
import './Card.scss'

interface CardProps {
  children: JSX.Element,
  title: string
}

export const Card = ({
  children,
  title
}: CardProps) => {
  return (
    <div className="card">
      <div className="card__title">
        {title}
      </div>

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}