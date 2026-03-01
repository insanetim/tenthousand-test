import type { Question, QuestionInput } from "../../shared/types"

export type QuestionWithId = QuestionInput & { id: string }

export type SubmitFormFieldProps = {
  question: Question
  questionIndex: number
  currentValue: string | string[]
  onAnswerChange: (index: number, value: string | string[]) => void
  hasError?: boolean
}
