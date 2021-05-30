import React from 'react';
import './Card.scss'

interface CardProps {
  children: JSX.Element,
  title?: string
}

export const Card = ({
  children,
  title
}: CardProps) => {
  return (
    <div className="card">
      {title ?
        <div className="card__title">
          {title}
        </div> : null
      }

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}