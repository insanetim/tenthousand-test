import { useState } from "react"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import FormField from "../components/UI/FormField"
import Wrapper from "../components/UI/Wrapper"

const CreateForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<string[]>([])

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
