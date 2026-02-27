interface FormFieldProps {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  placeholder?: string
  type?: 'text' | 'date'
}

const FormField: React.FC<FormFieldProps> = ({
  value,
  onChange,
  hasError = false,
  placeholder = "",
  type = "text",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  const errorClasses = "border-red-500 focus:ring-red-500"
  const normalClasses = "border-gray-300"

  const classes = `
    ${baseClasses}
    ${hasError ? errorClasses : normalClasses}
  `.trim()

  return (
    <input
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
