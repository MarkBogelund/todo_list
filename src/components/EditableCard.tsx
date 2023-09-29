import { useState, useEffect } from "react";

function EditableCard({
  todo,
  toggleTodo,
  setTodoColor,
}: {
  todo: {
    id: string;
    title: string;
    completed: boolean;
    color: string;
  };
  toggleTodo: (id: string, completed: boolean) => void;
  setTodoColor: (id: string, color: string) => void;
}) {
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo.completed]);

  const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
    toggleTodo?.(todo.id, !completed);
  };

  const handleColorChange = (color: string) => () => {
    todo.color = color;
    setTodoColor?.(todo.id, color);
  };

  return (
    <>
      <div className="flex items-center w-full ml-[20%] mt-[10%]">
        <input
          className="w-6 h-6 text-black mr-3"
          type="checkbox"
          onChange={handleCompleted}
          checked={completed}
        />

        <h2>{todo.title}</h2>

        <button
          onClick={handleColorChange("red")}
          className="w-4 h-4 rounded-[100%] bg-[#E63A3A] ml-2"
        ></button>
        <button
          onClick={handleColorChange("yellow")}
          className="w-4 h-4 rounded-[100%] bg-[#EFDE82] ml-2"
        ></button>
        <button
          onClick={handleColorChange("blue")}
          className="w-4 h-4 rounded-[100%] bg-[#75C9F8] ml-2"
        ></button>
        <button
          onClick={handleColorChange("all")}
          className="w-4 h-4 rounded-[100%] ml-2 border-2 border-white"
        ></button>
      </div>
    </>
  );
}

export default EditableCard;
