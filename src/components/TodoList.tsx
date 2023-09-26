import ListItem from "./ListItem";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../App";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  return (
    <div className="relative w-[50%] h-[65%] bg-[#466751] rounded-md p-3">
      <ul className="w-[100%] h-full grid grid-cols-5 auto-rows-min overflow-y-auto justify-items-center gap-4 scrollbar-none">
        {todos.length === 0 && (
          <li className="text-white mt-6 font-light">No todos</li>
        )}
        {todos.map((todo: Todo) => {
          return (
            <ListItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
      {/* <div className="h-full w-full flex justify-center">
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black opacity-30"></div>
      </div> */}
    </div>
  );
}
