export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

export type Question =
  | {
      id: string
      title: string
      type: QuestionType.TEXT | QuestionType.DATE
      required: boolean
    }
  | {
      id: string
      title: string
      type: QuestionType.MULTIPLE_CHOICE | QuestionType.CHECKBOX
      options: string[]
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

export type QuestionInput =
  | {
      title: string
      type: QuestionType.TEXT | QuestionType.DATE
      required: boolean
    }
  | {
      title: string
      type: QuestionType.MULTIPLE_CHOICE | QuestionType.CHECKBOX
      options: string[]
      required: boolean
    }

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
