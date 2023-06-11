import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedbyColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
}

export const useBoardState = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumns, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  }
}))
