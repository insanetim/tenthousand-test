import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"

const DefaultLayout = lazy(() => import("./layouts/Default"))
const Homepage = lazy(() => import("./pages/Homepage"))
const CreateForm = lazy(() => import("./pages/CreateForm"))
const FillForm = lazy(() => import("./pages/FillForm"))
const Responses = lazy(() => import("./pages/Responses"))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={<DefaultLayout />}
        >
          <Route
            index
            element={<Homepage />}
          />
          <Route
            path="forms/new"
            element={<CreateForm />}
          />
          <Route
            path="forms/:id/fill"
            element={<FillForm />}
          />
          <Route
            path="forms/:id/responses"
            element={<Responses />}
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
