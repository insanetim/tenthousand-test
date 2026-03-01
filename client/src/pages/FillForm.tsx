import { useParams } from "react-router"
import { useGetFormQuery } from "../api/formApiSlice"
import FormTitle from "../components/FormTitle"
import SubmitResponseForm from "../components/SubmitResponseForm/SubmitResponseForm"
import ErrorAlert from "../components/UI/ErrorAlert"
import Loading from "../components/UI/Loading"
import Wrapper from "../components/UI/Wrapper"

interface FillFormParams {
  id: string
}

const FillForm = () => {
  const { id } = useParams<keyof FillFormParams>() as FillFormParams

  const { data: form, isLoading, error } = useGetFormQuery({ id })

  let content

  if (isLoading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorAlert errorMessage={error.message || "An error occurred"} />
  } else if (form) {
    content = (
      <>
        <FormTitle
          className="mb-4"
          title={form.title}
          description={form.description}
        />
        <SubmitResponseForm
          formId={form.id}
          questions={form.questions}
        />
      </>
    )
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Fill Form</h1>
      {content}
    </Wrapper>
  )
}

export default FillForm
