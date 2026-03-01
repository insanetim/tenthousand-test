import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import {
  QuestionType,
  type Answer,
  type Question,
  type SubmitResponseDto,
} from "../../../../shared/types"
import { useSubmitResponseMutation } from "../../api/formApiSlice"
import showToast from "../../services/toast"
import {
  formatValidationErrors,
  validateSubmitResponse,
} from "../../services/validation"
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

  const [answers, setAnswers] = useState<Answer[]>(() => {
    return questions.map(question => ({
      questionId: question.id,
      value: question.type === QuestionType.CHECKBOX ? [] : "",
    }))
  })
  const [hasErrors, setHasErrors] = useState(false)

  const validationErrors = useMemo(() => {
    if (!hasErrors) return []

    const data: SubmitResponseDto = {
      formId,
      answers,
    }

    return validateSubmitResponse(data, questions)
  }, [hasErrors, formId, answers, questions])

  const errorMessage = useMemo(() => {
    if (submitError) {
      return submitError.message
    } else if (validationErrors.length > 0) {
      return formatValidationErrors(validationErrors)
    }
  }, [submitError, validationErrors])

  const handleAnswerChange = (index: number, value: string | string[]) => {
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[index].value = value
      return newAnswers
    })
  }

  const renderField = (question: Question, index: number) => {
    const componentsMap: Record<
      QuestionType,
      React.FC<SubmitFormFieldProps>
    > = {
      [QuestionType.TEXT]: TextField,
      [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceField,
      [QuestionType.CHECKBOX]: CheckboxField,
      [QuestionType.DATE]: DateField,
    }
    const FieldComponent = componentsMap[question.type]

    return FieldComponent ? (
      <FieldComponent
        key={question.id}
        index={index}
        question={question}
        currentValue={answers[index].value}
        onAnswerChange={handleAnswerChange}
        hasError={validationErrors.some(error =>
          error.field.includes(`answers[${index}]`)
        )}
      />
    ) : null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prepare form data for validation
    const data: SubmitResponseDto = {
      formId,
      answers,
    }

    // Validate form
    const validationErrors = validateSubmitResponse(data, questions)

    if (validationErrors.length > 0) {
      setHasErrors(true)
      return
    }

    setHasErrors(false)

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
