import ListItem from "./ListItem";
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
    <ul className="w-[50%] p-4 bg-slate-800 rounded-md h-[65%] bottom-[5%] grid gap-2 grid-cols-5 justify-items-center items-center">
      {todos.length === 0 && <li className="text-white">No todos</li>}
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
  );
}
