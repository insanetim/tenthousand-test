import { useParams } from "react-router"
import { useGetFormQuery } from "../api/formApiSlice"
import Wrapper from "../components/UI/Wrapper"

interface FillFormParams {
  id: string
}

const FillForm = () => {
  const { id } = useParams<keyof FillFormParams>() as FillFormParams

  const { data: form, isLoading, error } = useGetFormQuery({ id })

  console.log({ form, isLoading, error })

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Fill Form</h1>
      <p className="text-gray-600">Form filler functionality coming soon...</p>
    </Wrapper>
  )
}

export default FillForm
