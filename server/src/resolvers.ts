import { GraphQLError } from "graphql"
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
      try {
        const form = dataStore.getForm(id)
        if (!form) {
          throw new GraphQLError(`Form with id ${id} not found`, {
            extensions: { code: "NOT_FOUND", formId: id },
          })
        }
        return form
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        console.error("Error fetching form:", error)
        throw new GraphQLError("Failed to fetch form", {
          extensions: { code: "INTERNAL_ERROR" },
        })
      }
    },

    responses: (_: any, { formId }: ResponsesArgs) => {
      try {
        const form = dataStore.getForm(formId)
        if (!form) {
          throw new GraphQLError(`Form with id ${formId} not found`, {
            extensions: { code: "NOT_FOUND", formId },
          })
        }
        return dataStore.getResponses(formId)
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        console.error("Error fetching responses:", error)
        throw new GraphQLError("Failed to fetch responses", {
          extensions: { code: "INTERNAL_ERROR" },
        })
      }
    },
  },

  Mutation: {
    createForm: (_: any, args: CreateFormArgs) => {
      try {
        const { title, description, questions } = args
        if (!title || title.trim() === "") {
          throw new GraphQLError("Form title is required", {
            extensions: { code: "VALIDATION_ERROR", field: "title" },
          })
        }

        const dto: CreateFormDto = { title, description, questions }
        return dataStore.createForm(dto)
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        console.error("Error creating form:", error)
        throw new GraphQLError("Failed to create form", {
          extensions: { code: "INTERNAL_ERROR" },
        })
      }
    },

    submitResponse: (_: any, args: SubmitResponseArgs) => {
      try {
        const { formId, answers } = args
        const form = dataStore.getForm(formId)
        if (!form) {
          throw new GraphQLError(`Form with id ${formId} not found`, {
            extensions: { code: "NOT_FOUND", formId },
          })
        }

        // Validate that all required questions are answered
        for (const question of form.questions) {
          if (question.required) {
            const hasAnswer = answers.some(
              answer => answer.questionId === question.id
            )
            if (
              !hasAnswer ||
              answers.find(a => a.questionId === question.id)?.value.trim() ===
                ""
            ) {
              throw new GraphQLError(
                `Required question "${question.title}" must be answered`,
                {
                  extensions: {
                    code: "VALIDATION_ERROR",
                    field: "answers",
                    questionId: question.id,
                    questionTitle: question.title,
                  },
                }
              )
            }
          }
        }

        // Validate that all answered questions exist in the form
        for (const answer of answers) {
          const question = form.questions.find(q => q.id === answer.questionId)
          if (!question) {
            throw new GraphQLError(
              `Question with id ${answer.questionId} not found in form`,
              {
                extensions: {
                  code: "VALIDATION_ERROR",
                  field: "answers",
                  questionId: answer.questionId,
                },
              }
            )
          }
        }

        const dto: SubmitResponseDto = { formId, answers }
        return dataStore.submitResponse(dto)
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        console.error("Error submitting response:", error)
        throw new GraphQLError("Failed to submit response", {
          extensions: { code: "INTERNAL_ERROR" },
        })
      }
    },
  },
}
