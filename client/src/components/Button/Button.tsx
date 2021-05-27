import React from 'react';
import './Button.scss'

interface ButtonProps {
  primary?: boolean,
  secondary?: boolean,
  light?: boolean,
  disabled?: boolean,

  children: React.ReactNode
}

export const Button = ({
  primary,
  secondary,
  light,
  disabled,

  children
}: ButtonProps) => {

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

  return (
    <button
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}