import { Plus } from "lucide-react"
import React, { useMemo } from "react"
import { useNavigate } from "react-router"
import { useCreateFormMutation } from "../api/formApiSlice"
import QuestionConstructor from "../components/QuestionConstructor"
import SortableList from "../components/SortableList"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import FormField from "../components/UI/FormField"
import Wrapper from "../components/UI/Wrapper"
import { useCreateForm } from "../hooks/useCreateForm"
import showToast from "../services/toast"
import { formatValidationErrors } from "../services/validation"

const CreateForm = () => {
  const navigate = useNavigate()
  const [createForm, { isLoading, error: submitError }] =
    useCreateFormMutation()

  const {
    formData,
    validationErrors,
    updateFormData,
    addNewQuestion,
    updateQuestion,
    removeQuestion,
    reorderQuestions,
    validateFormData,
  } = useCreateForm()

  const errorMessage = useMemo(() => {
    if (submitError) {
      return submitError.message
    } else if (validationErrors.length > 0) {
      return formatValidationErrors(validationErrors)
    }
  }, [submitError, validationErrors])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = validateFormData()

    if (!data) return

    try {
      await createForm(data).unwrap()

      showToast.success("Form created successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error creating form:", error)
      showToast.error("Failed to create form.")
    }
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create New Form</h1>
      {errorMessage && (
        <div className="mb-4">
          <ErrorAlert errorMessage={errorMessage} />
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
            hasError={validationErrors.some(error => error.field === "title")}
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
              {formData.questions.map((question, index) => (
                <SortableList.Item
                  key={question.id}
                  onRemove={() => removeQuestion(question.id)}
                >
                  <QuestionConstructor
                    questionData={question}
                    onQuestionUpdate={updatedQuestion =>
                      updateQuestion(question.id, updatedQuestion)
                    }
                    validationErrors={validationErrors}
                    questionIndex={index}
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
            disabled={isLoading}
          >
            Create Form
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default CreateForm
