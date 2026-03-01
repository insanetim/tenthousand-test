import { Eye, FileText } from "lucide-react"
import FormTitle from "./FormTitle"
import Button from "./UI/Button"
import Card from "./UI/Card"

interface FormPreviewProps {
  id: string
  title: string
  description?: string
  createdAt: string
}

const FormPreview: React.FC<FormPreviewProps> = ({
  id,
  title,
  description,
  createdAt,
}) => {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <FileText
          className="text-blue-500 mt-1"
          size={20}
        />
        <div className="flex-1">
          <FormTitle
            title={title}
            description={description}
            createdAt={createdAt}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button to={`/forms/${id}/fill`}>
          <Eye size={16} />
          View Form
        </Button>
        <Button
          to={`/forms/${id}/responses`}
          color="secondary"
        >
          <FileText size={16} />
          View Responses
        </Button>
      </div>
    </Card>
  )
}

export default FormPreview
