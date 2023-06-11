import { database } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedbyColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumns) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
}

export const useBoardState = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumns, Column>()
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  }
}))
