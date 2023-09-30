import React, { useState, useEffect } from "react";
import ColorFilter from "./ColorFilter";
import EditableTitle from "./EditableTitle";
import { Todo } from "../App";

function EditableCard({
  todo,
  toggleTodo,
  setTodoColor,
  setSubtext,
}: {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => void;
  setTodoColor: (id: string, color: string) => void;
  setSubtext: (id: string, subtext: string) => void;
}) {
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo.completed]);

  const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
    toggleTodo?.(todo.id, !completed);
  };

  const handleColorChange = (color: string) => {
    todo.color = color;
    setTodoColor?.(todo.id, color);
  };

  const handleSubTextChange = (subtext: string) => {
    todo.subtext = subtext;
    setSubtext?.(todo.id, subtext);
  };

  return (
    <div className="w-96 h-96 rounded-md bg-[#96BBA2] shadow-lg flex flex-col justify-center">
      <h1 className="ml-[10%] mb-4 mt-[20%] text-2xl text-white font-thin">
        {todo.title}
      </h1>
      <div className="w-[80%] h-[1px] bg-white self-center"></div>
      <EditableTitle
        defaultTitle={todo.subtext}
        onSave={(text) => handleSubTextChange(text)}
        className="w-[80%] h-[50%] ml-[10%] mt-4"
        textType="subtext"
      />
      <div className="w-full flex justify-between mt-auto mb-4">
        <input
          className="w-6 h-6 text-black mx-4"
          type="checkbox"
          onChange={handleCompleted}
          checked={completed}
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
