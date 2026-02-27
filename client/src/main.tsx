import { ApiProvider } from "@reduxjs/toolkit/query/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Route, BrowserRouter as Router, Routes } from "react-router"
import { api } from "./api/baseApi.ts"
import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={api}>
      <Router>
        <Routes>
          <Route
            element={<App />}
            path="/*"
          />
        </Routes>
      </Router>
    </ApiProvider>
  </StrictMode>
)
