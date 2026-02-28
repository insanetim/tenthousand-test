import { Plus } from "lucide-react"
import { nanoid } from "nanoid"
import React, { useMemo, useState } from "react"
import type { CreateFormDto } from "../../../shared/types"
import { QuestionType } from "../../../shared/types"
import QuestionConstructor from "../components/QuestionConstructor"
import SortableList from "../components/SortableList"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import FormField from "../components/UI/FormField"
import Wrapper from "../components/UI/Wrapper"
import {
  formatValidationErrors,
  validateCreateForm,
} from "../services/validation"
import type { QuestionWithId } from "../types"

interface FormData {
  title: string
  description: string
  questions: QuestionWithId[]
}

const CreateForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    questions: [],
  })
  const [hasErrors, setHasErrors] = useState(false)

  const validationErrors = useMemo(() => {
    if (!hasErrors) return []

    const data: CreateFormDto = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      questions: formData.questions.map(
        ({ title, type, options, required }) => ({
          title,
          type,
          options,
          required,
        })
      ),
    }

    return formatValidationErrors(validateCreateForm(data))
  }, [hasErrors, formData])

  const updateFormData = <T extends keyof FormData>(
    key: T,
    value: FormData[T]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const addNewQuestion = () => {
    const newQuestion: QuestionWithId = {
      id: nanoid(5),
      title: "",
      type: QuestionType.TEXT,
      required: false,
    }
    const questions = [...formData.questions, newQuestion]
    updateFormData("questions", questions)
  }

  const updateQuestion = (id: string, updatedQuestion: QuestionWithId) => {
    const questions = formData.questions.map(q =>
      q.id === id ? updatedQuestion : q
    )
    updateFormData("questions", questions)
  }

  const removeQuestion = (id: string) => {
    const questions = formData.questions.filter(q => q.id !== id)
    updateFormData("questions", questions)
  }

  const reorderQuestions = (questions: QuestionWithId[]) => {
    updateFormData("questions", questions)
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prepare form data for validation
    const data: CreateFormDto = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      questions: formData.questions.map(
        ({ title, type, options, required }) => ({
          title,
          type,
          options,
          required,
        })
      ),
    }

    // Validate form
    const validationErrors = validateCreateForm(data)

    if (validationErrors.length > 0) {
      setHasErrors(true)
      return
    }

    setHasErrors(false)

    // TODO: Submit form to server
    console.log("Form submitted:", data)

    // Reset form
    setFormData({
      title: "",
      description: "",
      questions: [],
    })
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create New Form</h1>
      {validationErrors.length > 0 && (
        <div className="mb-4">
          <ErrorAlert errorMessage={validationErrors} />
        </div>
      )}
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <FormField
            id="title"
            value={formData.title}
            onChange={e => updateFormData("title", e.target.value)}
            hasError={validationErrors.some(error => error.includes("title"))}
            placeholder="Enter form title"
            labelText="Title*"
          />
        </div>

        <div>
          <FormField
            id="description"
            value={formData.description}
            onChange={e => updateFormData("description", e.target.value)}
            placeholder="Enter form description (optional)"
            labelText="Description"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Questions</h2>
            <Button
              variant="outlined"
              onClick={addNewQuestion}
            >
              <Plus className="w-4 h-4" />
              Add Question
            </Button>
          </div>

          {formData.questions.length > 0 ? (
            <SortableList
              list={formData.questions}
              setList={reorderQuestions}
            >
              {formData.questions.map(question => (
                <SortableList.Item
                  key={question.id}
                  onRemove={() => removeQuestion(question.id)}
                >
                  <QuestionConstructor
                    questionData={question}
                    onQuestionUpdate={updatedQuestion =>
                      updateQuestion(question.id, updatedQuestion)
                    }
                  />
                </SortableList.Item>
              ))}
            </SortableList>
          ) : (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              No questions added yet. Click "Add Question" to get started.
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
          >
            Create Form
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default CreateForm
