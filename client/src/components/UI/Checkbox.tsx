import React, { useState } from "react"
import { twMerge } from "tailwind-merge"

interface CheckboxProps {
  checked: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  disabled?: boolean
  className?: string
  id?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  id,
}) => {
  const [generatedId] = useState(
    () =>
      id || `checkbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  )

  const checkboxId = id || generatedId

  const checkboxClasses = twMerge(
    "w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 transition-colors",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  )

  const labelClasses = twMerge(
    "ml-2 text-sm font-medium text-gray-700",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  )

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={checkboxClasses}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={labelClasses}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
