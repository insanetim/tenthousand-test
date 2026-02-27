import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader
        className="animate-spin text-blue-500"
        size={32}
      />
    </div>
  )
}

export default Loading
