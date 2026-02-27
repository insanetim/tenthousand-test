import {
  CreateFormDto,
  Form,
  Question,
  Response,
  SubmitResponseDto,
} from "../../shared/types"

// In-memory data store
let forms: Form[] = []
let responses: Response[] = []
let nextFormId = 1
let nextResponseId = 1
let nextQuestionId = 1

export const dataStore = {
  // Forms
  getForms: (): Form[] => forms,

  getForm: (id: Form["id"]): Form | undefined => {
    try {
      return forms.find(form => form.id === id)
    } catch (error) {
      console.error(`Error fetching form ${id}:`, error)
      throw new Error(`Failed to fetch form ${id}`)
    }
  },

  createForm: (dto: CreateFormDto): Form => {
    try {
      const form: Form = {
        id: nextFormId.toString(),
        title: dto.title,
        description: dto.description,
        questions: dto.questions.map(q => {
          const baseQuestion = {
            id: nextQuestionId.toString(),
            title: q.title || "",
            type: q.type || "TEXT",
            required: q.required || false,
          }

          if (q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") {
            return {
              ...baseQuestion,
              options: q.options || [],
            }
          }

          return baseQuestion
        }) as Question[],
        createdAt: new Date().toISOString(),
      }

      forms.push(form)
      nextFormId++
      nextQuestionId += dto.questions.length || 1

      return form
    } catch (error) {
      console.error("Error creating form:", error)
      throw new Error("Failed to create form")
    }
  },

  // Responses
  getResponses: (formId: Form["id"]): Response[] => {
    try {
      return responses.filter(response => response.formId === formId)
    } catch (error) {
      console.error(`Error fetching responses for form ${formId}:`, error)
      throw new Error(`Failed to fetch responses for form ${formId}`)
    }
  },

  submitResponse: (dto: SubmitResponseDto): Response => {
    try {
      const response: Response = {
        id: nextResponseId.toString(),
        formId: dto.formId,
        answers: dto.answers.map(answer => ({
          questionId: answer.questionId,
          value: answer.value,
        })),
        submittedAt: new Date().toISOString(),
      }

      responses.push(response)
      nextResponseId++

      return response
    } catch (error) {
      console.error("Error submitting response:", error)
      throw new Error("Failed to submit response")
    }
  },
}
