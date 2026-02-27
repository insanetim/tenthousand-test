import { createApi } from "@reduxjs/toolkit/query/react"
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"

interface GraphQLErrorResponse {
  errors: Array<{
    message: string
    code?: string
    path?: string[]
    locations?: Array<{ line: number; column: number }>
  }>
}

interface ErrorResponse {
  error?: {
    name?: string
    message?: string
  }
}

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `${import.meta.env.VITE_SERVER_URL || "http://localhost:4000"}/graphql`,
    customErrors: ({ name, response }) => {
      const error = response as GraphQLErrorResponse | ErrorResponse

      // Extract GraphQL errors from the response
      if ("errors" in error && error.errors && error.errors.length > 0) {
        const firstError = error.errors[0]
        return {
          name: "GraphQLError",
          message: firstError.message,
          code: firstError.code,
        }
      }

      // Handle other HTTP errors
      if ("error" in error && error.error) {
        return {
          name: error.error.name || "HttpError",
          message: error.error.message || "An error occurred",
        }
      }

      // Fallback to default error
      return {
        name: name || "UnknownError",
        message: "An unknown error occurred",
      }
    },
  }),
  endpoints: () => ({}),
})
