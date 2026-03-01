import { useMemo, useState } from "react"
import type { Answer, Question, SubmitResponseDto } from "../../../shared/types"
import { validateSubmitResponse } from "../services/validation"

interface UseSubmitResponsArgs {
  formId: string
  questions: Question[]
}

export const useSubmitResponse = ({
  formId,
  questions,
}: UseSubmitResponsArgs) => {
  const [answers, setAnswers] = useState<Answer[]>(() => {
    return questions.map(question => ({
      questionId: question.id,
      value: question.type === "CHECKBOX" ? [] : "",
    }))
  })
  const [hasErrors, setHasErrors] = useState(false)

  const validationErrors = useMemo(() => {
    if (!hasErrors) return []

    const data: SubmitResponseDto = { formId, answers }

    return validateSubmitResponse(data, questions)
  }, [hasErrors, formId, answers, questions])

  const handleAnswerChange = (index: number, value: string | string[]) => {
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[index].value = value
      return newAnswers
    })
  }

  const validateFormData = () => {
    const data: SubmitResponseDto = {
      formId,
      answers,
    }

    const validationErrors = validateSubmitResponse(data, questions)
    const hasValidationErrors = validationErrors.length > 0

    setHasErrors(hasValidationErrors)

    return hasValidationErrors ? null : data
  }

  return {
    answers,
    validationErrors,
    handleAnswerChange,
    validateFormData,
  }
}
