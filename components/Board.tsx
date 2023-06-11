'use client'

import { useBoardState } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
  const getBoard = useBoardState((state) => state.getBoard);
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <h1>Board</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => (
    //       <div>
    //         {/* rendering all the columns */}
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;
