import { GripVertical } from "lucide-react"
import type { PropsWithChildren } from "react"
import { memo } from "react"

const SortableListItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center">
      <div className="handler cursor-move mr-2 p-2 ">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      {children}
    </div>
  )
}

export default memo(SortableListItem)
