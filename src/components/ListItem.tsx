import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

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
      className={`w-[80%] aspect-square flex justify-center items-center rounded-md ${
        completed ? "bg-[#3c6f69]" : "bg-[#96BBA2]"
      } relative group font-light overflow-hidden`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 
      invisible group-hover:visible flex items-center justify-center"
      >
        <button
          className="text-white w-8 h-8"
          onClick={() => toggleTodo?.(id, !completed)}
        >
          {completed ? <ClearIcon /> : <DoneIcon />}
        </button>
        <button className="text-white w-8 h-8" onClick={() => deleteTodo(id)}>
          <DeleteIcon />
        </button>
      </div>
      <h2 className="text-white text-center w-full">{title}</h2>
    </li>
  );
}

export default ListItem;
