import type { SubmitFormFieldProps } from "../../types"
import FormField from "../UI/FormField"

const DateField: React.FC<SubmitFormFieldProps> = ({
  question,
  questionIndex,
  currentValue,
  onAnswerChange,
  hasError,
}) => {
  return (
    <div className="response-field">
      <h4 className="text-lg font-semibold mb-2">
        {questionIndex + 1}. {question.title}
      </h4>
      <FormField
        type="date"
        value={typeof currentValue === "string" ? currentValue : ""}
        onChange={e => onAnswerChange(questionIndex, e.target.value)}
        hasError={hasError}
      />
    </div>
  )
}

export default DateField
