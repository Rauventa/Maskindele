import React from 'react';
import './Input.scss'

interface InputProps {
  placeholder: string,
  type: string,
  value: string | number,
  disabled?: boolean,
  onChange: (e: string) => void
}

export const Input = ({
  placeholder,
  type,
  value,
  disabled,
  onChange
}: InputProps) => {

  let className = 'input'

  if (disabled) {
    className+= ' input-disabled'
  }

  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}