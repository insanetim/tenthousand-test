import { createApi } from "@reduxjs/toolkit/query/react"
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:4000/graphql",
  }),
  endpoints: () => ({}),
})
