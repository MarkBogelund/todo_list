import React, { useState } from "react";

function TodoForm({ addTodo }: { addTodo: (title: string) => void }) {
  const [item, setItem] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (item === "") return;

    addTodo(item);

    setItem("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col my-6">
        <div>
          <label className="text-white">New item</label>
          <br />
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            type="text"
            id="item"
            className="w-full bg-blue-500 my-3 text-white"
          />
        </div>
        <button className="w-full border border-blue-500 rounded-sm text-blue-500">
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
