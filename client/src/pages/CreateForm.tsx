import { Plus, Trash2 } from "lucide-react"
import { nanoid } from "nanoid"
import React, { useMemo, useState } from "react"
import type { CreateFormDto } from "../../../shared/types"
import { QuestionType } from "../../../shared/types"
import QuestionConstructor from "../components/QuestionConstructor"
import SortableList from "../components/SortableList/SortableList"
import SortableListItem from "../components/SortableList/SortableListItem"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import FormField from "../components/UI/FormField"
import Wrapper from "../components/UI/Wrapper"
import {
  formatValidationErrors,
  validateCreateForm,
} from "../services/validation"
import type { QuestionWithId } from "../types"

const CreateForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [questions, setQuestions] = useState<QuestionWithId[]>([])

  const validationErrors = useMemo(() => {
    if (errors.length === 0) return []

    const formData: CreateFormDto = {
      title: title.trim(),
      description: description.trim() || undefined,
      questions: questions.map(({ title, type, options, required }) => ({
        title,
        type,
        options,
        required,
      })),
    }
    return formatValidationErrors(validateCreateForm(formData))
  }, [title, description, questions, errors.length])

  const addNewQuestion = () => {
    const newQuestion: QuestionWithId = {
      id: nanoid(),
      title: `Question ${questions.length + 1}`,
      type: QuestionType.TEXT,
      required: false,
    }
    const newQuestions = [...questions, newQuestion]
    setQuestions(newQuestions)
  }

  const updateQuestion = (id: string, updatedQuestion: QuestionWithId) => {
    const newQuestions = questions.map(q =>
      q.id === id ? { ...q, ...updatedQuestion } : q
    )
    setQuestions(newQuestions)
  }

  const removeQuestion = (id: string) => {
    const newQuestions = questions.filter(q => q.id !== id)
    setQuestions(newQuestions)
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prepare form data for validation
    const formData: CreateFormDto = {
      title: title.trim(),
      description: description.trim() || undefined,
      questions: questions.map(({ title, type, options, required }) => ({
        title,
        type,
        options,
        required,
      })),
    }

    // Validate form
    const validationErrors = validateCreateForm(formData)

    if (validationErrors.length > 0) {
      setErrors(formatValidationErrors(validationErrors))
      return
    }

    setErrors([])

    // TODO: Submit form to server
    console.log("Form submitted:", formData)

    // Reset form
    setTitle("")
    setDescription("")
    setQuestions([])
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
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title*
          </label>
          <FormField
            id="title"
            value={title}
            onChange={setTitle}
            hasError={validationErrors.some(error => error.includes("title"))}
            placeholder="Enter form title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <FormField
            id="description"
            value={description}
            onChange={setDescription}
            placeholder="Enter form description (optional)"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Questions</h2>
            <Button
              type="button"
              onClick={addNewQuestion}
              variant="outlined"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </Button>
          </div>

          {questions.length > 0 ? (
            <SortableList
              list={questions}
              setList={setQuestions}
            >
              {questions.map(question => (
                <SortableListItem key={question.id}>
                  <div className="flex-1">
                    <QuestionConstructor
                      questionData={question}
                      onChange={updatedQuestion =>
                        updateQuestion(question.id, updatedQuestion)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="ml-2 p-2 hover:text-red-700 hover:bg-red-50"
                    variant="secondary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </SortableListItem>
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
