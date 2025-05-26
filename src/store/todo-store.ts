import { TodoData } from "@/types/todo";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TodoState {
  todoList: TodoData[];
  addTodo: (contents: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: () => void;
  completeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist<TodoState>(
      (set, get) => ({
        todoList: [],
        addTodo: (contents) => {
          set((state) => ({
            todoList: [
              ...state.todoList,
              {
                id: state.todoList.length,
                contents: contents,
                complete: false,
                createdAt: new Date(),
              },
            ],
          }));
        },
        deleteTodo: (id) => {
          set((state) => ({
            todoList: state.todoList.filter((t) => t.id !== id),
          }));
        },
        updateTodo: () => {},
        completeTodo: (id) => {
          set((state) => ({
            todoList: state.todoList.map((t) =>
              t.id === id ? { ...t, complete: true } : t
            ),
          }));
        },
      }),
      { name: "todo-store" }
    )
  )
);
