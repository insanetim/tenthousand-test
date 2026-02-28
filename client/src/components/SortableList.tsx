import { GripVertical, Trash2 } from "lucide-react"
import { memo } from "react"
import { ReactSortable } from "react-sortablejs"
import Button from "./UI/Button"

type SortableItem = {
  id: string | number
}

interface SortableListProps<T extends SortableItem> {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  children: React.ReactNode
}

const SortableList = <T extends SortableItem>({
  list,
  setList,
  children,
}: SortableListProps<T>) => {
  return (
    <ReactSortable
      className="flex flex-col gap-2"
      list={list}
      setList={setList}
      handle=".handler"
    >
      {children}
    </ReactSortable>
  )
}

interface SortableListItemProps {
  children: React.ReactNode
  onRemove?: () => void
}

SortableList.Item = memo(({ children, onRemove }: SortableListItemProps) => {
  return (
    <div className="flex items-start">
      <div className="handler cursor-move mr-2 p-2 flex-none">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1">{children}</div>
      {onRemove && (
        <Button
          className="flex-none ml-2 p-2 hover:text-red-700 hover:bg-red-50"
          variant="secondary"
          onClick={onRemove}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
})

export default SortableList
