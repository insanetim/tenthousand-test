import { gql } from "graphql-request"
import type {
  CreateFormArgs,
  Form,
  Response,
  SubmitResponseArgs,
} from "../../../shared/types"
import { api } from "./baseApi"

// GraphQL response types
interface GetFormsResponse {
  forms: Form[]
}

interface GetFormResponse {
  form: Form
}

interface GetResponsesResponse {
  responses: Response[]
}

interface CreateFormResponse {
  createForm: Form
}

interface SubmitResponseResponse {
  submitResponse: Response
}

const formApiSlice = api
  .enhanceEndpoints({
    addTagTypes: ["Forms", "Form", "Responses"],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getForms: builder.query<GetFormsResponse, void>({
        providesTags: ["Forms"],
        query: () => ({
          document: gql`
            query GetForms {
              forms {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                  required
                }
                createdAt
              }
            }
          `,
        }),
      }),
      getForm: builder.query<GetFormResponse, { id: Form["id"] }>({
        providesTags: (_result, _error, { id }) => [{ type: "Form", id }],
        query: ({ id }) => ({
          document: gql`
            query GetForm($id: ID!) {
              form(id: $id) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                  required
                }
                createdAt
              }
            }
          `,
          variables: { id },
        }),
      }),
      getResponses: builder.query<GetResponsesResponse, { formId: Form["id"] }>(
        {
          providesTags: (_result, _error, { formId }) => [
            { type: "Responses", id: formId },
          ],
          query: ({ formId }) => ({
            document: gql`
              query GetResponses($formId: ID!) {
                responses(formId: $formId) {
                  id
                  formId
                  answers {
                    questionId
                    value
                  }
                  submittedAt
                }
              }
            `,
            variables: { formId },
          }),
        }
      ),
      createForm: builder.mutation<CreateFormResponse, CreateFormArgs>({
        invalidatesTags: ["Forms"],
        query: ({ title, description, questions }) => ({
          document: gql`
            mutation CreateForm(
              $title: String!
              $description: String
              $questions: [QuestionInput]
            ) {
              createForm(
                title: $title
                description: $description
                questions: $questions
              ) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                  required
                }
                createdAt
              }
            }
          `,
          variables: { title, description, questions },
        }),
      }),
      submitResponse: builder.mutation<
        SubmitResponseResponse,
        SubmitResponseArgs
      >({
        invalidatesTags: (_result, _error, { formId }) => [
          { type: "Responses", id: formId },
          { type: "Form", id: formId },
        ],
        query: ({ formId, answers }) => ({
          document: gql`
            mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
              submitResponse(formId: $formId, answers: $answers) {
                id
                formId
                answers {
                  questionId
                  value
                }
                submittedAt
              }
            }
          `,
          variables: { formId, answers },
        }),
      }),
    }),
  })

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formApiSlice

export default formApiSlice
