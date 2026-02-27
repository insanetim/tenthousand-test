export const QuestionType = {
  TEXT: "TEXT",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  CHECKBOX: "CHECKBOX",
  DATE: "DATE",
} as const

export interface Question {
  id: string
  title: string
  type: typeof QuestionType
  options?: string[]
  required: boolean
}

export interface Form {
  id: string
  title: string
  description?: string
  questions: Question[]
  createdAt: string
}

export interface Answer {
  questionId: string
  value: string
}

export interface Response {
  id: string
  formId: string
  answers: Answer[]
  submittedAt: string
}

// Input types for GraphQL mutations
export interface QuestionInput {
  title: string
  type: typeof QuestionType
  options?: string[]
  required: boolean
}

export interface AnswerInput {
  questionId: string
  value: string
}

// DTO interfaces for data store operations
export interface CreateFormDto {
  title: string
  description?: string
  questions?: Partial<Question>[]
}

export interface SubmitResponseDto {
  formId: string
  answers: { questionId: string; value: string }[]
}

// Resolver argument DTO interfaces
export interface FormArgs {
  id: string
}

export interface ResponsesArgs {
  formId: string
}

export interface CreateFormArgs {
  title: string
  description?: string
  questions?: QuestionInput[]
}

export interface SubmitResponseArgs {
  formId: string
  answers: AnswerInput[]
}
