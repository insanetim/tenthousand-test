import {
  CreateFormArgs,
  CreateFormDto,
  FormArgs,
  ResponsesArgs,
  SubmitResponseArgs,
  SubmitResponseDto,
} from "../../shared/types"
import { dataStore } from "./data"

export const resolvers = {
  Query: {
    forms: () => dataStore.getForms(),

    form: (_: any, { id }: FormArgs) => {
      const form = dataStore.getForm(id)
      if (!form) {
        throw new Error(`Form with id ${id} not found`)
      }
      return form
    },

    responses: (_: any, { formId }: ResponsesArgs) => {
      const form = dataStore.getForm(formId)
      if (!form) {
        throw new Error(`Form with id ${formId} not found`)
      }
      return dataStore.getResponses(formId)
    },
  },

  Mutation: {
    createForm: (_: any, args: CreateFormArgs) => {
      const { title, description, questions } = args
      if (!title || title.trim() === "") {
        throw new Error("Form title is required")
      }

      const dto: CreateFormDto = { title, description, questions }
      return dataStore.createForm(dto)
    },

    submitResponse: (_: any, args: SubmitResponseArgs) => {
      const { formId, answers } = args
      const form = dataStore.getForm(formId)
      if (!form) {
        throw new Error(`Form with id ${formId} not found`)
      }

      // Validate that all required questions are answered
      for (const question of form.questions) {
        if (question.required) {
          const hasAnswer = answers.some(
            answer => answer.questionId === question.id
          )
          if (
            !hasAnswer ||
            answers.find(a => a.questionId === question.id)?.value.trim() === ""
          ) {
            throw new Error(
              `Required question "${question.title}" must be answered`
            )
          }
        }
      }

      // Validate that all answered questions exist in the form
      for (const answer of answers) {
        const question = form.questions.find(q => q.id === answer.questionId)
        if (!question) {
          throw new Error(
            `Question with id ${answer.questionId} not found in form`
          )
        }
      }

      const dto: SubmitResponseDto = { formId, answers }
      return dataStore.submitResponse(dto)
    },
  },
}
