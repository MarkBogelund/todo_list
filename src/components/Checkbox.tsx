import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

function Checkbox({
  toggleTodo,
  deleteTodo,
  id,
  completed,
  className,
}: {
  toggleTodo?: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  id: string;
  completed: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
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
  );
}

export default Checkbox;
