import React from 'react';

interface CheckboxProps {
  children: React.ReactNode,
  checked: boolean,
  onChange: (value: boolean) => void
}

export const Checkbox = ({
  children,
  checked,
  onChange
}: CheckboxProps) => {

  const handleChange = (value: boolean) => {
    onChange(value)
  }

  return (
    <label>
      {children}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => handleChange(event.target.checked)} />
    </label>
  )
}