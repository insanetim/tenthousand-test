import { Plus } from "lucide-react"
import { useGetFormsQuery } from "../api/formApiSlice"
import FormPreview from "../components/FormPreview"
import Button from "../components/UI/Button"
import ErrorAlert from "../components/UI/ErrorAlert"
import Loading from "../components/UI/Loading"
import Wrapper from "../components/UI/Wrapper"

const Homepage = () => {
  const { data, isLoading, error } = useGetFormsQuery()

  let content

  if (isLoading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorAlert errorMessage={error.message || "An error occurred"} />
  } else if (data?.forms.length === 0) {
    content = (
      <p className="text-gray-500">No forms found. Create your first form!</p>
    )
  } else {
    content = (
      <div className="space-y-4">
        {data?.forms.map(form => (
          <FormPreview
            key={form.id}
            id={form.id}
            title={form.title}
            description={form.description}
            createdAt={form.createdAt}
          />
        ))}
      </div>
    )
  }

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forms</h1>
        <Button to="/forms/new">
          <Plus size={20} />
          Create New Form
        </Button>
      </div>
      {content}
    </Wrapper>
  )
}

export default Homepage
