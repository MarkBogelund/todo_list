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
    <li
      className={`w-[80%] h-[80%] flex justify-center items-center rounded-md ${
        completed ? "bg-gray-400" : "bg-blue-700"
      } relative group`}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
        w-full h-full bg-black bg-opacity-50 rounded-md
      invisible group-hover:visible"
      >
        <button
          className="text-white w-8 h-8 text-3xl"
          onClick={() => toggleTodo?.(id, !completed)}
        >
          O
        </button>
        <button
          className="text-white w-8 h-8 text-3xl"
          onClick={() => deleteTodo(id)}
        >
          X
        </button>
      </div>
      <h2 className="text-white text-center w-full">{title}</h2>
    </li>
  );
}

export default ListItem;
