import { formatDateWithTime } from "../services/format"

interface FormTitleProps {
  className?: string
  title: string
  description?: string
  createdAt?: string
}

const FormTitle: React.FC<FormTitleProps> = ({
  title,
  description,
  createdAt,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-600 mt-2">{description}</p>}
      {createdAt && (
        <p className="text-sm text-gray-500 mt-2">
          {formatDateWithTime(createdAt)}
        </p>
      )}
    </div>
  )
}

export default FormTitle
