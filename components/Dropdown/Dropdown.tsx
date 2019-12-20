import React from 'react'

type Props = {
  className?: string
  options: Array<string>
  size?: number
  placeholder?: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Dropdown = ({ className, options, size = 1, placeholder, onChange }: Props) => (
  <select size={size} className={className} onChange={onChange}>
    {placeholder ? (
      <option defaultValue={null} selected>
        {placeholder}
      </option>
    ) : null}

    {options.map((value) => (
      <option key={`${value}`} value={value}>
        {value}
      </option>
    ))}
  </select>
)

export default Dropdown
