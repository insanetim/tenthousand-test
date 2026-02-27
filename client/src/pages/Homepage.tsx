import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useGetFormsQuery } from "../api/formApiSlice"
import ErrorAlert from "../components/ErrorAlert"
import FormItem from "../components/FormItem"
import Loading from "../components/Loading"
import Wrapper from "../components/Wrapper"

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
          <FormItem
            key={form.id}
            id={form.id}
            title={form.title}
            description={form.description}
          />
        ))}
      </div>
    )
  }

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forms</h1>
        <Link
          to="/forms/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus size={20} />
          Create New Form
        </Link>
      </div>
      {content}
    </Wrapper>
  )
}

export default Homepage
