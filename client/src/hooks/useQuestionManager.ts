import { useMemo } from "react"
import type { QuestionType } from "../../../shared/types"
import type { QuestionWithId } from "../types"

interface UseQuestionManagerArgs {
  questionData: QuestionWithId
  onQuestionUpdate: (question: QuestionWithId) => void
}

export const useQuestionManager = ({
  questionData,
  onQuestionUpdate,
}: UseQuestionManagerArgs) => {
  const withOptions = useMemo(
    () =>
      questionData.type === "MULTIPLE_CHOICE" ||
      questionData.type === "CHECKBOX",
    [questionData.type]
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      title: e.target.value,
    })
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType
    const newOptions =
      newType === "MULTIPLE_CHOICE" || newType === "CHECKBOX" ? [""] : undefined

    onQuestionUpdate({
      ...questionData,
      type: newType,
      options: newOptions,
    })
  }

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...questionData,
      required: e.target.checked,
    })
  }

  const addOption = () => {
    if (withOptions) {
      const newQuestionData = {
        ...questionData,
        options: [...(questionData.options || []), ""],
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  const removeOption = (index: number) => {
    if (withOptions) {
      const newQuestionData = {
        ...questionData,
        options: questionData.options?.filter((_, i) => i !== index) || [],
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  const updateOption = (index: number, value: string) => {
    if (withOptions) {
      const newOptions = [...(questionData.options || [])]
      newOptions[index] = value
      const newQuestionData = {
        ...questionData,
        options: newOptions,
      }

      onQuestionUpdate(newQuestionData)
    }
  }

  return {
    withOptions,
    handleTitleChange,
    handleTypeChange,
    handleRequiredChange,
    addOption,
    removeOption,
    updateOption,
  }
}
