import React from "react"
import { Link } from "react-router"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
  className?: string
  to?: string
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  to,
  fullWidth = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
      default:
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
    }
  }

  const baseClasses =
    "flex items-center gap-2 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium cursor-pointer"
  const widthClasses = fullWidth ? "w-full justify-center" : ""
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  const variantClasses = getVariantClasses()

  const classes = `
    ${baseClasses}
    ${widthClasses}
    ${variantClasses}
    ${disabledClasses}
    ${className}
  `.trim()

  const sharedProps = {
    className: classes,
    children,
  }

  if (to) {
    return (
      <Link
        to={to}
        {...sharedProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...sharedProps}
    />
  )
}

export default Button
