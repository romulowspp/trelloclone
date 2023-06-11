"use client";

import { useBoardState } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardState((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrengedColumns = new Map(entries);
      setBoardState({...board, columns: rearrengedColumns});
      return;
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    }

    const endCol: Column = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    }

    if (!startCol || !endCol) return;

    if (source.index === destination.index && startCol === endCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === endCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      }
      const newColumns = new Map(board.columns);
      newColumns.set(newCol.id, newCol);
      setBoardState({...board, columns: newColumns});
    } else {
      const endTodos = Array.from(endCol.todos);
      endTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      }
      newColumns.set(startCol.id, newCol);
      newColumns.set(endCol.id, {
        id: endCol.id,
        todos: endTodos,
      });

      updateTodoInDB(todoMoved, endCol.id);
      setBoardState({...board, columns: newColumns});
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
        
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
