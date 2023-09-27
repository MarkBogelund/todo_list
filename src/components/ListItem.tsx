import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ListItemProps {
  completed: boolean;
  id: string;
  title: string;
  color?: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

function ListItem({
  completed,
  id,
  title,
  color,
  toggleTodo,
  deleteTodo,
}: ListItemProps) {
  const provideColor = () => {
    switch (color) {
      case "red":
        return "bg-[#E63A3A]";
      case "yellow":
        return "bg-[#F7C948]";
      case "blue":
        return "bg-[#3C6F69]";
      case "undefined":
        return "hidden";
    }
  };

  return (
    <li
      className={`w-[100%] aspect-square flex justify-center items-center rounded-md group-hover:scale-50 ${
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
      <div className="w-4 h-4 rounded-[100%] absolute bg-red-600 bottom-1 left-1"></div>
    </li>
  );
}

export default ListItem;
