'use client'

import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumns;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <div
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef}
    className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <h1>Hello</h1>
    </div>
  )
}

export default TodoCard