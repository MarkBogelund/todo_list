import ListItem from "./ListItem";
import { useState } from "react";
import { Todo } from "../App";
import EditableCard from "./EditableCard";

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

  const [card, setCard] = useState({
    title: "",
    color: "",
    completed: false,
    id: "",
  });

  const handleOpenCard = (
    completed: boolean,
    id: string,
    title: string,
    color?: string
  ) => {
    setOpenCard(true);
    setCard({
      title: title,
      color: color ? color : "undefined",
      completed: completed,
      id: id,
    });
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
        <div className="w-96 h-96 rounded-md bg-[#96BBA2] shadow-lg flex flex-col items-center">
          <EditableCard
            title={card.title}
            color={card.color}
            completed={card.completed}
            id={card.id}
            toggleTodo={toggleTodo}
          />
        </div>
      </div>
    </>
  );
}
