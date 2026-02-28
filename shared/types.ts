export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

export interface Question {
  id: string
  title: string
  type: QuestionType
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
  value: string | string[]
}

export interface Response {
  id: string
  formId: string
  answers: Answer[]
  submittedAt: string
}

export type QuestionInput = Omit<Question, "id">

// DTO interfaces
export interface CreateFormDto {
  title: string
  description?: string
  questions: QuestionInput[]
}

export interface SubmitResponseDto {
  formId: string
  answers: Answer[]
}
