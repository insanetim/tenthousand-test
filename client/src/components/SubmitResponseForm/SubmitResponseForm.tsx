import { useMemo } from "react"
import { useNavigate } from "react-router"
import { type Question, type QuestionType } from "../../../../shared/types"
import { useSubmitResponseMutation } from "../../api/formApiSlice"
import { useSubmitResponse } from "../../hooks/useSubmitResponse"
import showToast from "../../services/toast"
import { formatValidationErrors } from "../../services/validation"
import type { SubmitFormFieldProps } from "../../types"
import Button from "../UI/Button"
import Card from "../UI/Card"
import ErrorAlert from "../UI/ErrorAlert"
import CheckboxField from "./CheckboxField"
import DateField from "./DateField"
import MultipleChoiceField from "./MultipleChoiceField"
import TextField from "./TextField"

interface SubmitResponseFormProps {
  formId: string
  questions: Question[]
}

const SubmitResponseForm: React.FC<SubmitResponseFormProps> = ({
  formId,
  questions,
}) => {
  const navigate = useNavigate()

  const [submitResponse, { isLoading, error: submitError }] =
    useSubmitResponseMutation()

  const { answers, validationErrors, handleAnswerChange, validateFormData } =
    useSubmitResponse({
      formId,
      questions,
    })

  const errorMessage = useMemo(() => {
    if (submitError) {
      return submitError.message
    } else if (validationErrors.length > 0) {
      return formatValidationErrors(validationErrors)
    }
  }, [submitError, validationErrors])

  const renderField = (question: Question, questionIndex: number) => {
    const componentsMap: Record<
      QuestionType,
      React.FC<SubmitFormFieldProps>
    > = {
      TEXT: TextField,
      MULTIPLE_CHOICE: MultipleChoiceField,
      CHECKBOX: CheckboxField,
      DATE: DateField,
    }
    const FieldComponent = componentsMap[question.type]

    return FieldComponent ? (
      <FieldComponent
        key={question.id}
        question={question}
        questionIndex={questionIndex}
        currentValue={answers[questionIndex].value}
        onAnswerChange={handleAnswerChange}
        hasError={validationErrors.some(error =>
          error.field.includes(`answers[${questionIndex}]`)
        )}
      />
    ) : null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = validateFormData()

    if (!data) return

    try {
      await submitResponse(data).unwrap()

      showToast.success("Response submitted successfully!")
      navigate(`/forms/${formId}/responses`)
    } catch (error) {
      console.error("Error submitting response:", error)
      showToast.error("Failed to submit response.")
    }
  }

  return (
    <>
      {errorMessage && (
        <div className="mb-4">
          <ErrorAlert errorMessage={errorMessage} />
        </div>
      )}
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <Card>{questions.map(renderField)}</Card>
        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            Submit Response
          </Button>
        </div>
      </form>
    </>
  )
}

export default SubmitResponseForm
