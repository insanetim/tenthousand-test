import { ReactSortable } from "react-sortablejs"

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

export default SortableList
