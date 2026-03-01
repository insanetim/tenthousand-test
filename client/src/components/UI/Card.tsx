const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {children}
    </div>
  )
}

export default Card
