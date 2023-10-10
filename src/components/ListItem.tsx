import { useEffect } from "react";
import Checkbox from "./Checkbox";

export interface ListItemProps {
  completed: boolean;
  id: string;
  title: string;
  color?: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  showEditableCard: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

function ListItem({
  completed,
  id,
  title,
  color,
  toggleTodo,
  deleteTodo,
  showEditableCard,
  onToggleComplete,
}: ListItemProps) {
  const provideColor = () => {
    switch (color) {
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

  // Call function everytime the 'completed' prop changes
  useEffect(() => {
    onToggleComplete(id, completed);
  }, [completed]);

  return (
    <li
      className={`w-[100%] aspect-square flex justify-center items-center rounded-md ${
        completed ? "bg-[#3c6f69]" : "bg-[#7daa8b]"
      } relative group font-light overflow-hidden`}
      onClick={() => showEditableCard(id)}
    >
      <div
        className="absolute w-[110%] h-[110%] bg-black flex items-center justify-center
        invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:bg-opacity-50 transition-opacity ease-in duration-100"
      >
        <Checkbox
          className="hidden sm:block"
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          id={id}
          completed={completed}
        />
      </div>
      <p className="text-white text-center break-all p-4">{title}</p>
      <div
        className={`w-3 h-3 rounded-[100%] absolute bottom-1 left-1 
        ${provideColor()}`}
      ></div>
    </li>
  );
}

export default ListItem;
