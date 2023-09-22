function ListItem({
  completed,
  id,
  title,
  toggleTodo,
  deleteTodo,
}: {
  completed: boolean;
  id: string;
  title: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  return (
    <div>
      <li className="my-2 flex justify-between">
        <label className="text-white">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
            className="mr-2"
          />
          {title}
        </label>
        <button
          className="text-blue-500 ml-2 border-blue-500 rounded-sm border px-1"
          onClick={() => deleteTodo(id)}
        >
          Delete
        </button>
      </li>
    </div>
  );
}

export default ListItem;
