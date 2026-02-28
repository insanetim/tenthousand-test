import React from "react"
import { QuestionType } from "../../../shared/types"
import type { QuestionWithId } from "../types"
import FormField from "./UI/FormField"
import Select from "./UI/Select"

interface QuestionConstructorProps {
  questionData: QuestionWithId
  onChange: (questionData: QuestionWithId) => void
}

const QuestionConstructor = ({
  questionData,
  onChange,
}: QuestionConstructorProps) => {
  const questionTypeOptions = [
    { value: QuestionType.TEXT, label: "Text" },
    { value: QuestionType.MULTIPLE_CHOICE, label: "Multiple Choice" },
    { value: QuestionType.CHECKBOX, label: "Checkbox" },
    { value: QuestionType.DATE, label: "Date" },
  ]

  const handleTypeChange = (value: string) => {
    const newType = value as QuestionType
    const baseData = {
      id: questionData.id,
      title: questionData.title,
      required: questionData.required,
    }

    if (
      newType === QuestionType.MULTIPLE_CHOICE ||
      newType === QuestionType.CHECKBOX
    ) {
      const newQuestionData = {
        ...baseData,
        type: newType,
        options: [],
      } as QuestionWithId

      onChange(newQuestionData)
    } else {
      const newQuestionData = {
        ...baseData,
        type: newType,
      } as QuestionWithId

      onChange(newQuestionData)
    }
  }

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRequired = e.target.checked
    onChange({
      ...questionData,
      required: newRequired,
    })
  }

  const addOption = () => {
    if (
      questionData.type === QuestionType.MULTIPLE_CHOICE ||
      questionData.type === QuestionType.CHECKBOX
    ) {
      const newQuestionData = {
        ...questionData,
        options: [...(questionData.options || []), ""],
      }

      onChange(newQuestionData)
    }
  }

  const removeOption = (index: number) => {
    if (
      questionData.type === QuestionType.MULTIPLE_CHOICE ||
      questionData.type === QuestionType.CHECKBOX
    ) {
      const newQuestionData = {
        ...questionData,
        options: questionData.options?.filter((_, i) => i !== index) || [],
      }

      onChange(newQuestionData)
    }
  }

  const updateOption = (index: number, value: string) => {
    if (
      questionData.type === QuestionType.MULTIPLE_CHOICE ||
      questionData.type === QuestionType.CHECKBOX
    ) {
      const newOptions = [...(questionData.options || [])]
      newOptions[index] = value
      const newQuestionData = {
        ...questionData,
        options: newOptions,
      }

      onChange(newQuestionData)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Title Field */}
          <div className="md:col-span-2">
            <label
              htmlFor={`q-${questionData.id}-title`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question Title
            </label>
            <FormField
              id={`q-${questionData.id}-title`}
              value={questionData.title}
              onChange={newTitle =>
                onChange({ ...questionData, title: newTitle })
              }
              placeholder="Enter question"
            />
          </div>

          {/* Type Select */}
          <div>
            <label
              htmlFor={`q-${questionData.id}-type`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <Select
              id={`q-${questionData.id}-type`}
              options={questionTypeOptions}
              value={questionData.type}
              onChange={handleTypeChange}
            />
          </div>

          {/* Required Checkbox */}
          <div className="flex items-end">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={questionData.required}
                onChange={handleRequiredChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="required"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Required
              </label>
            </div>
          </div>
        </div>

        {/* Options Management for Multiple Choice and Checkbox */}
        {(questionData.type === QuestionType.MULTIPLE_CHOICE ||
          questionData.type === QuestionType.CHECKBOX) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Options
              </label>
              <button
                type="button"
                onClick={addOption}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add Option
              </button>
            </div>

            {(questionData.options || []).map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2"
              >
                <FormField
                  value={option}
                  onChange={value => updateOption(index, value)}
                  placeholder={`Option ${index + 1}`}
                />
                {(questionData.options || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {(questionData.options || []).length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No options added yet. Click "Add Option" to get started.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="mt-6 p-3 bg-gray-100 rounded text-sm">
        <p className="font-medium">Current Question Data:</p>
        <pre className="mt-1 text-xs">
          {JSON.stringify(questionData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default QuestionConstructor
