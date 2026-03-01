import type { Question, QuestionInput } from "../../shared/types"

export type QuestionWithId = QuestionInput & { id: string }

export type SubmitFormFieldProps = {
  index: number
  question: Question
  currentValue: string | string[]
  onAnswerChange: (index: number, value: string | string[]) => void
  hasError?: boolean
}
