import ListItem from "./ListItem";
import { useState } from "react";
import { Todo } from "../App";
import EditableCard from "./EditableCard";

export default function TodoList({
  todos,
  filter,
  redFilter,
  yellowFilter,
  blueFilter,
  toggleTodo,
  deleteTodo,
  setTodoColor,
  setSubtext,
  setTitle,
}: {
  todos: Todo[];
  filter: string;
  redFilter: Todo[];
  yellowFilter: Todo[];
  blueFilter: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  setTodoColor: (id: string, color: string) => void;
  setSubtext: (id: string, subtext: string) => void;
  setTitle: (id: string, title: string) => void;
}) {
  const [openCard, setOpenCard] = useState(false);
  const [card, setCard] = useState<Todo>({
    id: "",
    title: "",
    completed: false,
    color: "",
    subtext: "",
  });

  const handleOpenCard = (id: string) => {
    setOpenCard(true);
    setCard(todos.filter((todo: Todo) => todo.id === id)[0]);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    deleteTodo?.(card.id);
  };

  const onToggleComplete = (id: string, completed: boolean) => {
    if (openCard == true && id === card.id) {
      setCard((currentTodo: Todo) => {
        return { ...currentTodo, completed };
      });
    }
  };

  const handleFiltering = (color: string) => {
    let filteredTodos;
    switch (color) {
      case "red":
        filteredTodos = redFilter;
        break;
      case "yellow":
        filteredTodos = yellowFilter;
        break;
      case "blue":
        filteredTodos = blueFilter;
        break;
      case "all":
      default:
        filteredTodos = todos;
        break;
    }

    // Check if the list is empty first
    if (filteredTodos.length === 0) {
      return (
        <li className="text-white mt-6 ml-6 font-light self-start w-52">
          {color === "all" ? "No todos" : `No ${color} todos`}
        </li>
      );
    }

    const handleDeleteTodo = (id: string) => {
      deleteTodo?.(id);

      if (openCard == true && id === card.id) {
        setOpenCard(false);
      }
    };

    // Map over the filteredTodos and return JSX elements
    return filteredTodos.map((todo: Todo) => (
      <ListItem
        key={todo.id}
        {...todo}
        toggleTodo={toggleTodo}
        deleteTodo={handleDeleteTodo}
        showEditableCard={(id) => handleOpenCard(id)}
        onToggleComplete={onToggleComplete}
      />
    ));
  };

  return (
    <>
      <div className="relative w-[85%] sm:w-[70%] lg:w-[50%] h-[65%] bg-[#486150] rounded-md p-3">
        <ul className="w-[100%] h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 auto-rows-min overflow-y-auto justify-items-start gap-6 scrollbar-none">
          {handleFiltering(filter)}
        </ul>
      </div>
      <div
        className={`absolute flex justify-center items-center w-full h-[120%] bg-black ${
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
        <EditableCard
          todo={card}
          toggleTodo={toggleTodo}
          deleteTodo={handleCloseCard}
          setTodoColor={setTodoColor}
          setSubtext={setSubtext}
          setTitle={setTitle}
        />
      </div>
    </>
  );
}
