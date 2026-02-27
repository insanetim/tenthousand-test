import { nanoid } from "@reduxjs/toolkit"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import SortableList from "../components/SortableList/SortableList"
import SortableListItem from "../components/SortableList/SortableListItem"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import FormField from "../components/UI/FormField"
import Wrapper from "../components/UI/Wrapper"

type Question = {
  id: string
  text: string
}

const CreateForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: string[] = []

    // Basic validation
    if (!title.trim()) {
      newErrors.push("Form title is required")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])

    // TODO: Submit form to server
    console.log("Form submitted:", { title, description })

    // Reset form
    setTitle("")
    setDescription("")
    setQuestions([])
  }

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: nanoid(),
      text: `Question ${questions.length + 1}`,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, text } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create New Form</h1>
      {errors.length > 0 && (
        <div className="mb-4">
          <ErrorAlert errorMessage={errors} />
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
            Title *
          </label>
          <FormField
            value={title}
            onChange={handleTitleChange}
            hasError={errors.some(error => error.includes("title"))}
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
              className="flex items-center gap-2"
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
                    <FormField
                      value={question.text}
                      onChange={value => updateQuestion(question.id, value)}
                      placeholder="Enter question text"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="ml-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
