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
    <div>
      <ul className=" my-3">
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
