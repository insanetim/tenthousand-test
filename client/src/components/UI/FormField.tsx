import { twMerge } from "tailwind-merge"

interface FormFieldProps {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  placeholder?: string
  type?: "text" | "date"
  id?: string
}

const FormField: React.FC<FormFieldProps> = ({
  value,
  onChange,
  hasError = false,
  placeholder = "",
  type = "text",
  id,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  const errorClasses = "border-red-500 focus:ring-red-500"
  const normalClasses = "border-gray-300"

  const classes = twMerge(baseClasses, hasError ? errorClasses : normalClasses)

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={classes}
      aria-invalid={hasError}
    />
  )
}

export default FormField
