import type {
  CreateFormDto,
  Question,
  SubmitResponseDto,
} from "../../../shared/types"

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
        options.forEach((option, optionIndex) => {
          if (!option.trim()) {
            errors.push({
              field: `questions[${index}].options[${optionIndex}]`,
              message: `Option ${optionIndex + 1} in question ${index + 1} cannot be empty`,
            })
          }
        })
      }
    }
  })

  return errors
}

export const validateSubmitResponse = (
  formData: SubmitResponseDto,
  questions: Question[]
): ValidationError[] => {
  const errors: ValidationError[] = []

  // Check each required question has an answer
  questions.forEach((question, questionIndex) => {
    if (question.required) {
      const answer = formData.answers.find(a => a.questionId === question.id)

      if (!answer) {
        errors.push({
          field: `answers[${questionIndex}]`,
          message: `Question ${questionIndex + 1} is required`,
        })
        return
      }

      // Check if answer is empty based on question type
      const answerValue = answer.value

      if (question.type === "CHECKBOX") {
        // For checkbox, check if array is empty
        if (Array.isArray(answerValue) && answerValue.length === 0) {
          errors.push({
            field: `answers[${questionIndex}]`,
            message: `Question ${questionIndex + 1} requires at least one selection`,
          })
        }
      } else {
        // For other types, check if string is empty
        if (typeof answerValue === "string" && !answerValue.trim()) {
          errors.push({
            field: `answers[${questionIndex}]`,
            message: `Question ${questionIndex + 1} is required`,
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
