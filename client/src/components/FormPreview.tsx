import { Eye, FileText } from "lucide-react"
import Button from "./UI/Button"

interface FormPreviewProps {
  id: string
  title: string
  description?: string
}

const FormPreview: React.FC<FormPreviewProps> = ({
  id,
  title,
  description,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <FileText
          className="text-blue-500 mt-1"
          size={20}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && <p className="text-gray-600 mb-4">{description}</p>}
        </div>
      </div>
      <div className="flex gap-3">
        <Button to={`/forms/${id}/fill`}>
          <Eye size={16} />
          View Form
        </Button>
        <Button
          to={`/forms/${id}/responses`}
          variant="secondary"
        >
          <FileText size={16} />
          View Responses
        </Button>
      </div>
    </div>
  )
}

export default FormPreview
