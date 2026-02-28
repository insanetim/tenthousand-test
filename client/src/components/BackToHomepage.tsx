import { Home } from "lucide-react"
import { Link, useLocation } from "react-router"

export default function BackToHomepage() {
  const location = useLocation()

  if (location.pathname === "/") {
    return null
  }

  return (
    <div className="p-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Home size={16} />
        Back to Homepage
      </Link>
    </div>
  )
}
