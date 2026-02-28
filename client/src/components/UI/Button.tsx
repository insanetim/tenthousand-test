import React from "react"
import { Link } from "react-router"
import { twMerge } from "tailwind-merge"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  color?: "primary" | "secondary" | "danger"
  variant?: "contained" | "outlined"
  size?: "medium" | "small"
  disabled?: boolean
  className?: string
  to?: string
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  size = "medium",
  disabled = false,
  className = "",
  to,
  fullWidth = false,
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "secondary":
        return variant === "contained"
          ? "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
          : "border-2 border-gray-600 text-gray-600 bg-transparent hover:bg-gray-50 focus:ring-gray-500"
      case "danger":
        return variant === "contained"
          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
          : "border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500"
      default:
        return variant === "contained"
          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
          : "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "py-1.5 px-3 text-sm"
      default:
        return "py-2 px-4"
    }
  }

  const baseClasses =
    "flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium cursor-pointer"
  const widthClasses = fullWidth ? "w-full justify-center" : ""
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  const colorClasses = getColorClasses()
  const sizeClasses = getSizeClasses()

  const classes = twMerge(
    baseClasses,
    sizeClasses,
    widthClasses,
    disabledClasses,
    colorClasses,
    className
  )

  const sharedProps = {
    className: classes,
    children,
  }

  if (to) {
    return (
      <Link
        to={to}
        {...sharedProps}
      />
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
