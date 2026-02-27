interface ErrorAlertProps {
  errorMessage: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage }) => {
  return (
    <div className="text-red-600 bg-red-50 border border-red-200 rounded p-3">
      {errorMessage}
    </div>
  )
}

export default ErrorAlert
