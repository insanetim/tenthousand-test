import { Outlet } from "react-router"
import BackToHomepage from "../components/BackToHomepage"

const DefaultLayout = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <BackToHomepage />
      <Outlet />
    </div>
  )
}

export default DefaultLayout
