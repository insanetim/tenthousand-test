interface ErrorAlertProps {
  errorMessage: string | string[]
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage }) => {
  const renderError = () => {
    if (Array.isArray(errorMessage)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {errorMessage.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )
    }

    return <span>{errorMessage}</span>
  }

  return (
    <div className="text-red-600 bg-red-50 border border-red-200 rounded p-3">
      {renderError()}
    </div>
  )
}

export default ErrorAlert
