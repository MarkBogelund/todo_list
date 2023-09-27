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
  openCard: (
    completed: boolean,
    id: string,
    title: string,
    color?: string
  ) => void;
}

function ListItem({
  completed,
  id,
  title,
  color,
  toggleTodo,
  deleteTodo,
  openCard,
}: ListItemProps) {
  const provideColor = (providedColor: string) => {
    switch (providedColor) {
      case "red":
        return "bg-[#E63A3A]";
      case "yellow":
        return "bg-[#EFDE82]";
      case "blue":
        return "bg-[#75C9F8]";
      case "undefined":
        return "hidden";
    }
  };

  const handleCardClick = () => {
    openCard(completed, id, title, color);
  };

  return (
    <li
      className={`w-[100%] aspect-square flex justify-center items-center rounded-md ${
        completed ? "bg-[#3c6f69]" : "bg-[#96BBA2]"
      } relative group font-light overflow-hidden hover:scale-105 transition-all ease-in duration-100`}
      onClick={handleCardClick}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center
        invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:bg-opacity-50 transition-opacity ease-in duration-100"
      >
        <button
          className="text-white w-8 h-8"
          onClick={(event) => {
            event.stopPropagation(); // Stop propagation here
            toggleTodo?.(id, !completed);
          }}
        >
          {completed ? <ClearIcon /> : <DoneIcon />}
        </button>
        <button
          className="text-white w-8 h-8"
          onClick={(event) => {
            event.stopPropagation(); // Stop propagation here
            deleteTodo(id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
      <h2 className="text-white text-center w-full">{title}</h2>
      <div
        className={`w-3 h-3 rounded-[100%] absolute bottom-1 left-1 
        ${provideColor("undefined")}`}
      ></div>
    </li>
  );
}

export default ListItem;
