import React from "react"
import { twMerge } from "tailwind-merge"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  className?: string
  id?: string
  disabled?: boolean
  labelText?: string
}

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  className = "",
  id,
  disabled = false,
  labelText,
}: SelectProps) => {
  const baseClasses =
    "w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"

  const classes = twMerge(baseClasses, className)

  return (
    <>
      {labelText && (
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <select
        id={id}
        value={value}
        className={classes}
        disabled={disabled}
        onChange={onChange}
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
    </>
  )
}

export default Select
