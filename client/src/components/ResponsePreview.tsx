import {
  type Answer,
  type Question,
  type Response,
} from "../../../shared/types"
import { formatDate, formatDateWithTime } from "../services/format"
import Card from "./UI/Card"

interface ResponsePreviewProps {
  response: Response
  questionsMap: Record<string, Question>
}

const ResponsePreview: React.FC<ResponsePreviewProps> = ({
  response,
  questionsMap,
}) => {
  const formatAnswer = (answer: Answer, question: Question) => {
    if (!answer.value || answer.value.length === 0) return "N/A"
    if (question.type === "DATE") {
      return formatDate(answer.value as string)
    }
    const value = Array.isArray(answer.value) ? answer.value : [answer.value]
    return value.join(", ")
  }

  return (
    <Card>
      <h4 className="text-md text-gray-600 mb-4">
        Response submitted at: {formatDateWithTime(response.submittedAt)}
      </h4>
      <div className="space-y-3">
        {response.answers.map((answer, index) => {
          const question = questionsMap[answer.questionId]
          return (
            <div key={index}>
              <h5 className="text-sm font-semibold mb-1">
                {index + 1}. {question.title}
              </h5>
              <p className="text-gray-600">{formatAnswer(answer, question)}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default ResponsePreview
