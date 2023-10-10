import { useState, useEffect } from "react";
import ColorFilter from "./ColorFilter";
import { Todo } from "../App";
import Checkbox from "./Checkbox";

function EditableCard({
  todo,
  toggleTodo,
  deleteTodo,
  setTodoColor,
  setSubtext,
  setTitle,
}: {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  setTodoColor: (id: string, color: string) => void;
  setSubtext: (id: string, subtext: string) => void;
  setTitle: (id: string, title: string) => void;
}) {
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setCompleted(todo.completed);
    console.log("todo.completed new", todo.completed);
  }, [todo.completed]);

  const handleCompleted = (id: string, completedStatus: boolean) => {
    toggleTodo?.(id, completedStatus);
  };

  const handleDelete = () => {
    deleteTodo?.(todo.id);
    console.log("delete", todo);
  };

  const handleColorChange = (color: string) => {
    todo.color = color;
    setTodoColor?.(todo.id, color);
  };

  const handleSubTextChange = (subtext: string) => {
    todo.subtext = subtext;
    setSubtext?.(todo.id, subtext);
  };

  const handleTitleChange = (title: string) => {
    todo.title = title;
    setTitle?.(todo.id, title);
  };

  return (
    <div
      className={`w-[90%] sm:w-96 aspect-square rounded-md shadow-lg flex flex-col justify-center ${
        completed ? "bg-[#3c6f69]" : "bg-[#7daa8b]"
      }`}
    >
      <textarea
        className="w-[80%] h-[12%] ml-[10%] mt-[20%] mb-4 text-white text-2xl font-thin border-transparent 
  focus:border-white focus:outline-none focus:ring-1 focus:ring-white 
  bg-transparent p-2 pt-1 rounded-md scrollbar-none placeholder-white placeholder-opacity-70 resize-none"
        placeholder="Add a title..."
        onChange={(e) => handleTitleChange(e.target.value)}
        value={todo.title}
        maxLength={28}
      ></textarea>

      <div className="w-[80%] h-[1px] bg-white self-center"></div>
      <textarea
        className="w-[80%] h-[50%] ml-[10%] mt-4 text-white font-thin border-transparent 
      focus:border-white focus:outline-none focus:ring-1 focus:ring-white 
      bg-transparent p-2 rounded-md scrollbar-none placeholder-white placeholder-opacity-70 resize-none"
        placeholder="Add a description..."
        onChange={(e) => handleSubTextChange(e.target.value)}
        maxLength={300}
        value={todo.subtext}
      ></textarea>

      <div className="w-full flex justify-between mt-auto mb-4">
        <Checkbox
          toggleTodo={handleCompleted}
          deleteTodo={handleDelete}
          id={todo.id}
          completed={completed}
          className="self-start ml-3"
        />

        <ColorFilter
          handleColorClick={handleColorChange}
          className="self-end mx-4"
        />
      </div>
    </div>
  );
}

export default EditableCard;
