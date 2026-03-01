import React from "react"
import { QuestionType } from "../../../shared/types"
import type { ValidationError } from "../services/validation"
import type { QuestionWithId } from "../types"
import Button from "./UI/Button"
import Checkbox from "./UI/Checkbox"
import FormField from "./UI/FormField"
import Select from "./UI/Select"

interface QuestionConstructorProps {
  questionData: QuestionWithId
  onQuestionUpdate: (question: QuestionWithId) => void
  validationErrors?: ValidationError[]
  questionIndex?: number
}

const TYPE_OPTIONS = [
  { value: QuestionType.TEXT, label: "Text" },
  { value: QuestionType.MULTIPLE_CHOICE, label: "Multiple Choice" },
  { value: QuestionType.CHECKBOX, label: "Checkbox" },
  { value: QuestionType.DATE, label: "Date" },
]

const QuestionConstructor = ({
  questionData,
  onQuestionUpdate,
  validationErrors,
  questionIndex = 0,
}: QuestionConstructorProps) => {
  const withOptions =
    questionData.type === QuestionType.MULTIPLE_CHOICE ||
    questionData.type === QuestionType.CHECKBOX

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      title: e.target.value,
    })
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType
    const newOptions =
      newType === QuestionType.MULTIPLE_CHOICE ||
      newType === QuestionType.CHECKBOX
        ? [""]
        : undefined

    onQuestionUpdate({
      ...questionData,
      type: newType,
      options: newOptions,
    })
  }

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      required: e.target.checked,
    })
  }

  const addOption = () => {
    if (withOptions) {
      const newQuestionData = {
        ...questionData,
        options: [...(questionData.options || []), ""],
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  const removeOption = (index: number) => {
    if (withOptions) {
      const newQuestionData = {
        ...questionData,
        options: questionData.options?.filter((_, i) => i !== index) || [],
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  const updateOption = (index: number, value: string) => {
    if (withOptions) {
      const newOptions = [...(questionData.options || [])]
      newOptions[index] = value
      const newQuestionData = {
        ...questionData,
        options: newOptions,
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Title Field */}
          <div className="md:col-span-2">
            <FormField
              id={`q-${questionData.id}-title`}
              value={questionData.title}
              onChange={handleTitleChange}
              placeholder="Enter question"
              labelText="Question Title"
              hasError={validationErrors?.some(error =>
                error.field.includes(`questions[${questionIndex}].title`)
              )}
            />
          </div>

          {/* Type Select */}
          <div>
            <Select
              id={`q-${questionData.id}-type`}
              options={TYPE_OPTIONS}
              value={questionData.type}
              onChange={handleTypeChange}
              labelText="Type"
            />
          </div>

          {/* Required Checkbox */}
          <div className="flex items-end">
            <div className="flex items-center">
              <Checkbox
                id={`q-${questionData.id}-required`}
                label="Required"
                checked={questionData.required}
                onChange={handleRequiredChange}
              />
            </div>
          </div>
        </div>

        {/* Options Management for Multiple Choice and Checkbox */}
        {withOptions && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="block text-sm font-medium text-gray-700">
                Options
              </h4>
              <Button
                variant="outlined"
                size="small"
                onClick={addOption}
              >
                Add Option
              </Button>
            </div>

            {(questionData.options || []).map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2"
              >
                <FormField
                  value={option}
                  onChange={e => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  hasError={validationErrors?.some(error =>
                    error.field.includes(
                      `questions[${questionIndex}].options[${index}]`
                    )
                  )}
                />
                {(questionData.options || []).length > 1 && (
                  <Button
                    size="small"
                    color="danger"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionConstructor
