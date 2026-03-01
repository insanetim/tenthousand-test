import type { SubmitFormFieldProps } from "../../types"
import Radio from "../UI/Radio"

const MultipleChoiceField: React.FC<SubmitFormFieldProps> = ({
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
      <div className="space-y-2">
        {question.options?.map((option, optionIndex) => (
          <Radio
            key={optionIndex}
            value={option}
            label={option}
            checked={
              typeof currentValue === "string" && currentValue === option
            }
            onChange={e => onAnswerChange(questionIndex, e.target.value)}
            name={`question-${question.id}`}
            hasError={hasError}
          />
        ))}
      </div>
    </div>
  )
}

export default MultipleChoiceField
