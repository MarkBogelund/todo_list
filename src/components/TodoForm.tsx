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
    <form onSubmit={handleSubmit} className="flex w-[30%] h-10 mb-6">
      <button className="h-full aspect-square mr-2 rounded-md bg-blue-500 text-white">
        +
      </button>
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        id="item"
        placeholder="New item"
        className="flex-1 h-full bg-blue-500 text-white rounded-md placeholder:text-white pl-2"
      />
    </form>
  );
}

export default TodoForm;
