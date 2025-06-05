import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodoStore } from "@/store/todo-store";
import { TodoData } from "@/types/todo";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Check, Edit, XIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";

const Todo = () => {
  const { todoList, addTodo, completeTodo, deleteTodo } = useTodoStore();
  const [contents, setContents] = useState<string>("");

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    addTodo(contents);
    setContents("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex-shrink-0">
        <Input
          value={contents}
          placeholder="todo"
          onKeyDown={(e) => handleAdd(e)}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>

      <ScrollArea className="h-full min-h-0">
        <div className="flex-1 overflow-auto">
          {todoList.length > 0 ? (
            todoList.map((t, i) => (
              <TodoItem
                key={i}
                data={t}
                onComplete={() => completeTodo(t.id)}
                onDelete={() => deleteTodo(t.id)}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-xs">할 일을 생성하세요.</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface TodoItemProps {
  data: TodoData;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({ data, onComplete, onDelete }: TodoItemProps) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex flex-col gap-1">
        <span className="text-sm">{data.contents}</span>
        <span className="text-[0.65rem]">
          {format(data.createdAt, "yy/MM/dd HH:mm:ss")}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Edit className="w-4 h-4 text-gray-500 hover:text-gray-600 hover:cursor-pointer" />
          <XIcon
            className="w-4 h-4 text-gray-500 hover:text-red-600 hover:cursor-pointer"
            onClick={onDelete}
          />
          <Check className="w-4 h-4 text-gray-500 hover:text-green-600 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
