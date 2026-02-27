import type { PropsWithChildren } from "react"

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 shadow-lg">
      {children}
    </div>
  )
}

export default Wrapper
