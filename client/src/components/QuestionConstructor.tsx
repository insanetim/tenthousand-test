import React from "react"
import { QuestionType } from "../../../shared/types"
import type { QuestionWithId } from "../types"
import Checkbox from "./UI/Checkbox"
import FormField from "./UI/FormField"
import Select from "./UI/Select"

interface QuestionConstructorProps {
  questionData: QuestionWithId
  onQuestionUpdate: (question: QuestionWithId) => void
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
}: QuestionConstructorProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      title: e.target.value,
    })
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQuestionUpdate({
      ...questionData,
      type: e.target.value as QuestionType,
      options: [],
    })
  }

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      required: e.target.checked,
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

      onQuestionUpdate(newQuestionData)
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

      onQuestionUpdate(newQuestionData)
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
                id="required"
                label="Required"
                checked={questionData.required}
                onChange={handleRequiredChange}
              />
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
                  onChange={e => updateOption(index, e.target.value)}
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
