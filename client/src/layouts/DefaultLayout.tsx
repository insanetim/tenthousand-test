import { Outlet } from "react-router"

const DefaultLayout = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <Outlet />
    </div>
  )
}

export default DefaultLayout
