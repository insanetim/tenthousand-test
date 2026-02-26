import {
  CreateFormDto,
  Form,
  QuestionType,
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

  getForm: (id: Form["id"]): Form | undefined =>
    forms.find(form => form.id === id),

  createForm: (dto: CreateFormDto): Form => {
    const form: Form = {
      id: nextFormId.toString(),
      title: dto.title,
      description: dto.description,
      questions: (dto.questions || []).map((q, index) => ({
        id: nextQuestionId.toString(),
        title: q.title || "",
        type: q.type || QuestionType.TEXT,
        options: q.options || [],
        required: q.required || false,
      })),
      createdAt: new Date().toISOString(),
    }

    forms.push(form)
    nextFormId++
    nextQuestionId += dto.questions?.length || 1

    return form
  },

  // Responses
  getResponses: (formId: Form["id"]): Response[] =>
    responses.filter(response => response.formId === formId),

  submitResponse: (dto: SubmitResponseDto): Response => {
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
  },
}
