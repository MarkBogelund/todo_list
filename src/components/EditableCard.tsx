import { useState } from "react";
import Editable from "react-editable-title";

function EditableCard({
  title,
  color,
  completed,
  id,
  toggleTodo,
}: {
  title: string;
  color: string;
  completed: boolean;
  id: string;
  toggleTodo: (id: string, completed: boolean) => void;
}) {
  return (
    <>
      <div className="flex items-center w-full ml-[20%] mt-[10%]">
        <input
          className="w-6 h-6 text-black mr-3"
          type="checkbox"
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />

        <h2>{title}</h2>
      </div>
    </>
  );
}

export default EditableCard;
