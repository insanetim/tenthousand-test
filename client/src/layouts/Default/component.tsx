import { Outlet } from "react-router"

const DefaultLayout = () => {
  return (
    <div className="max-w-[90vw] w-160 mx-auto my-3">
      <Outlet />
    </div>
  )
}

export default DefaultLayout
