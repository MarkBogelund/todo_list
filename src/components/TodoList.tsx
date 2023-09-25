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
    <ul className="w-[50%] px-3 py-6 bg-[#466751] rounded-md grid gap-2 gap-y-8 grid-cols-5 justify-items-center items-center overflow-y-auto">
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
