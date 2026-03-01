import { useMemo } from "react"
import { useParams } from "react-router"
import type { Question } from "../../../shared/types"
import { useGetFormQuery, useGetResponsesQuery } from "../api/formApiSlice"
import FormTitle from "../components/FormTitle"
import ResponsePreview from "../components/ResponsePreview"
import ErrorAlert from "../components/UI/ErrorAlert"
import Loading from "../components/UI/Loading"
import Wrapper from "../components/UI/Wrapper"

interface ResponsesParams {
  id: string
}

const Responses = () => {
  const { id } = useParams<keyof ResponsesParams>() as ResponsesParams

  const {
    data: form,
    isLoading: isLoadingForm,
    error: errorForm,
  } = useGetFormQuery({ id })
  const {
    data: responses,
    isLoading: isLoadingResponses,
    error: errorResponses,
  } = useGetResponsesQuery({ formId: id })

  const questionsMap = useMemo(() => {
    return (form?.questions || []).reduce(
      (acc, question) => {
        acc[question.id] = question
        return acc
      },
      {} as Record<string, Question>
    )
  }, [form])

  const isLoading = isLoadingForm || isLoadingResponses
  const errorMessage = errorForm
    ? errorForm.message
    : errorResponses
      ? errorResponses.message
      : null

  let content

  if (isLoading) {
    content = <Loading />
  } else if (errorMessage) {
    content = <ErrorAlert errorMessage={errorMessage || "An error occurred"} />
  } else if (form && responses) {
    content = (
      <>
        <FormTitle
          className="mb-4"
          title={form.title}
          description={form.description}
        />
        {responses.length > 0 ? (
          <div className="space-y-4">
            {responses.map(response => (
              <ResponsePreview
                key={response.id}
                response={response}
                questionsMap={questionsMap}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No responses submitted for this form yet.
          </p>
        )}
      </>
    )
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Form Responses</h1>
      {content}
    </Wrapper>
  )
}

export default Responses
