import { nanoid } from "nanoid"
import { useMemo, useState } from "react"
import type { CreateFormDto } from "../../../shared/types"
import { validateCreateForm } from "../services/validation"
import type { QuestionWithId } from "../types"

interface FormData {
  title: string
  description: string
  questions: QuestionWithId[]
}

const initialFormData: FormData = {
  title: "",
  description: "",
  questions: [],
}

export const useCreateForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
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

    return validateCreateForm(data)
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
      type: "TEXT",
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

  const validateFormData = () => {
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

    const validationErrors = validateCreateForm(data)
    const hasValidationErrors = validationErrors.length > 0

    setHasErrors(hasValidationErrors)
    return hasValidationErrors ? false : data
  }

  return {
    formData,
    validationErrors,
    updateFormData,
    addNewQuestion,
    updateQuestion,
    removeQuestion,
    reorderQuestions,
    validateFormData,
  }
}
