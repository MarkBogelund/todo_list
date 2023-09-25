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
    <div className="bg-slate-800 w-[51.5%] py-4 px-4 rounded-md fixed top-[35%] overflow-y-auto max-lg">
      <ul className="flex flex-row flex-wrap">
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
    </div>
  );
}
