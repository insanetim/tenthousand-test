import { Eye, FileText } from "lucide-react"
import { Link } from "react-router-dom"

interface FormItemProps {
  id: string
  title: string
  description?: string
}

const FormItem: React.FC<FormItemProps> = ({ id, title, description }) => {
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
        <Link
          to={`/forms/${id}/fill`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Eye size={16} />
          View Form
        </Link>
        <Link
          to={`/forms/${id}/responses`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          <FileText size={16} />
          View Responses
        </Link>
      </div>
    </div>
  )
}

export default FormItem
