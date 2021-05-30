import React from 'react';
import { NavLink } from 'react-router-dom';
import './Button.scss'

interface ButtonProps {
  primary?: boolean,
  secondary?: boolean,
  light?: boolean,
  disabled?: boolean,

  onClick?: () => void,

  href?: any,

  children: React.ReactNode
}

export const Button = ({
  primary,
  secondary,
  light,
  disabled,

  onClick,

  href,

  children
}: ButtonProps) => {

  const returnClickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  let className = 'btn'

  if (primary) {
    className+= ' btn-primary'
  }

  if (secondary) {
    className+= ' btn-secondary'
  }

  if (light) {
    className+= ' btn-light'
  }

  if (disabled) {
    className+= ' btn-disabled'
  }

  if (href) {
    return (
      <NavLink
        to={href}
        className={className}
      >
        {children}
      </NavLink>
    )
  } else {
    return (
      <button
        className={className}
        disabled={disabled}
        onClick={returnClickHandler}
      >
        {children}
      </button>
    )
  }
}