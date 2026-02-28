import type React from "react"
import { twMerge } from "tailwind-merge"

interface FormFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasError?: boolean
  placeholder?: string
  type?: "text" | "date"
  id?: string
  labelText?: string
}

const FormField: React.FC<FormFieldProps> = ({
  value,
  onChange,
  hasError = false,
  placeholder = "",
  type = "text",
  id,
  labelText,
}) => {
  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  const errorClasses = "border-red-500 focus:ring-red-500"
  const normalClasses = "border-gray-300"

  const classes = twMerge(baseClasses, hasError ? errorClasses : normalClasses)

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
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classes}
        aria-invalid={hasError}
        onChange={onChange}
      />
    </>
  )
}

export default FormField
