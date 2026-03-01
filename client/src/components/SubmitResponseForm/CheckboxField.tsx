import type { SubmitFormFieldProps } from "../../types"
import Checkbox from "../UI/Checkbox"

const CheckboxField: React.FC<SubmitFormFieldProps> = ({
  question,
  questionIndex,
  currentValue,
  onAnswerChange,
  hasError,
}) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValues = Array.isArray(currentValue) ? currentValue : []
    let newValues: string[]

    if (checked) {
      newValues = currentValues.includes(option)
        ? currentValues
        : [...currentValues, option]
    } else {
      newValues = currentValues.filter(val => val !== option)
    }

    onAnswerChange(questionIndex, newValues)
  }

  return (
    <div className="response-field">
      <h4 className="text-lg font-semibold mb-2">
        {questionIndex + 1}. {question.title}
      </h4>
      <div className="space-y-2">
        {question.options?.map((option, optionIndex) => (
          <Checkbox
            key={optionIndex}
            label={option}
            checked={
              Array.isArray(currentValue) && currentValue.includes(option)
            }
            onChange={e => handleCheckboxChange(option, e.target.checked)}
            hasError={hasError}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxField
