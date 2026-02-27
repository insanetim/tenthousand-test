import type { CreateFormDto } from "../../../shared/types"

export interface ValidationError {
  field: string
  message: string
}

export const validateCreateForm = (
  formData: CreateFormDto
): ValidationError[] => {
  const errors: ValidationError[] = []

  // Validate form title
  if (!formData.title.trim()) {
    errors.push({
      field: "title",
      message: "Form title is required",
    })
  }

  // Validate questions length
  if (formData.questions.length === 0) {
    errors.push({
      field: "questions",
      message: "At least one question is required",
    })
  }

  // Validate each question
  formData.questions.forEach((question, index) => {
    // Validate question title
    if (!question.title.trim()) {
      errors.push({
        field: `questions[${index}].title`,
        message: `Question ${index + 1} title is required`,
      })
    }

    // Validate questions with options
    if (question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX") {
      const options = question.options || []

      if (options.length === 0) {
        errors.push({
          field: `questions[${index}].options`,
          message: `Question ${index + 1} must have at least one option`,
        })
      } else {
        // Check for empty options
        const emptyOptionIndex = options.findIndex(option => !option.trim())
        if (emptyOptionIndex !== -1) {
          errors.push({
            field: `questions[${index}].options[${emptyOptionIndex}]`,
            message: `Option ${emptyOptionIndex + 1} in question ${index + 1} cannot be empty`,
          })
        }
      }
    }
  })

  return errors
}

export const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.map(error => error.message)
}
