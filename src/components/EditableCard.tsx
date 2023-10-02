import { useState, useEffect } from "react";
import ColorFilter from "./ColorFilter";
import EditableTitle from "./EditableTitle";
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
    console.log("delete");
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
      <EditableTitle
        defaultTitle={todo.title}
        onSave={(text) => handleTitleChange(text)}
        positionStyle="w-[80%] h-[12%] ml-[10%] mt-[20%] mb-4"
        titleStyle="text-2xl"
        textType="title"
      />
      <div className="w-[80%] h-[1px] bg-white self-center mt-2"></div>
      <EditableTitle
        defaultTitle={todo.subtext}
        onSave={(text) => handleSubTextChange(text)}
        positionStyle="w-[80%] h-[50%] ml-[10%] mt-4"
        textType="subtext"
      />
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
