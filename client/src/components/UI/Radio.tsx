import React, { useState } from "react"
import { twMerge } from "tailwind-merge"

interface RadioProps {
  value: string
  checked: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  hasError?: boolean
}

const Radio: React.FC<RadioProps> = ({
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  id,
  name,
  hasError = false,
}) => {
  const [generatedId] = useState(
    () => id || `radio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  )

  const radioId = id || generatedId
  const radioName = name || `radio-group-${generatedId}`

  const radioClasses = twMerge(
    "w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 transition-colors",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  )

  const labelClasses = twMerge(
    "ml-2 text-sm font-medium text-gray-700",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  )

  return (
    <div
      className={`flex items-center ${hasError ? "bg-red-50 p-2 rounded" : ""}`}
    >
      <input
        type="radio"
        id={radioId}
        name={radioName}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={radioClasses}
      />
      {label && (
        <label
          htmlFor={radioId}
          className={labelClasses}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Radio
