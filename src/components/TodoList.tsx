import ListItem from "./ListItem";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../App";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  const [openCard, setOpenCard] = useState(false);

  const [cardTitle, setCardTitle] = useState("");

  const [cardColor, setCardColor] = useState("");

  const [cardCompleted, setCardCompleted] = useState(false);

  const [cardId, setCardId] = useState("");

  const handleOpenCard = (
    completed: boolean,
    id: string,
    title: string,
    color?: string
  ) => {
    setOpenCard(true);
    setCardTitle(title);
    setCardColor(color!);
    setCardCompleted(completed);
    setCardId(id);
  };

  return (
    <>
      <div className="relative w-[50%] h-[65%] bg-[#466751] rounded-md p-3">
        <ul className="w-[100%] h-full grid grid-cols-5 auto-rows-min overflow-y-auto justify-items-center gap-6 scrollbar-none">
          {todos.length === 0 && (
            <li className="text-white mt-6 font-light">No todos</li>
          )}
          {todos.map((todo: Todo) => {
            return (
              <ListItem
                key={todo.id}
                {...todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                openCard={(completed, id, title, color) =>
                  handleOpenCard(completed, id, title, color)
                }
              />
            );
          })}
        </ul>
      </div>
      <div
        className={`absolute flex justify-center items-center w-full h-screen bg-black ${
          openCard
            ? "visible bg-opacity-40 transition-opacity ease-in duration-100"
            : "invisible opacity-0"
        }`}
        onClick={(e) => {
          // Check if the click target is the outer div (not a child element)
          if (e.target === e.currentTarget) {
            setOpenCard(false);
          }
        }}
      >
        <div className="w-96 h-96 rounded-md bg-[#96BBA2] shadow-lg"></div>
      </div>
    </>
  );
}
