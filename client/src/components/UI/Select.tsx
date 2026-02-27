import React from "react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
  disabled?: boolean
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  id,
  disabled = false,
}: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <select
      id={id}
      value={value || ""}
      onChange={handleChange}
      disabled={disabled}
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    >
      {placeholder && (
        <option
          value=""
          disabled
        >
          {placeholder}
        </option>
      )}
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
