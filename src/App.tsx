import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  color: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue) {
      return JSON.parse(localValue);
    } else {
      return [];
    }
  });

  const [redFilter, setRedFilter] = useState<Todo[]>([]);

  const [yellowFilter, setYellowFilter] = useState<Todo[]>([]);

  const [blueFilter, setBlueFilter] = useState<Todo[]>([]);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setRedFilter(todos.filter((todo: Todo) => todo.color === "red"));
    setYellowFilter(todos.filter((todo: Todo) => todo.color === "yellow"));
    setBlueFilter(todos.filter((todo: Todo) => todo.color === "blue"));
  }, [todos]);

  const handleFiltering = (color: string) => () => {
    setFilter(color);
  };

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (item: string) => {
    setTodos((currentTodos: Todo[]) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: item!,
        completed: false,
        color: "",
      };
      return [...currentTodos, newTodo];
    });
  };

  const toggleTodo = (id: string, completed: boolean) => {
    console.log("Completed status:", completed);

    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const setTodoColor = (id: string, color: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, color };
        }
        return todo;
      });
    });

    addToFilter(id, color);
  };

  const addToFilter = (id: string, color: string) => {
    setRedFilter((currentTodos: Todo[]) => {
      if (color === "red" && !currentTodos.some((todo) => todo.id === id)) {
        return [...currentTodos, { id, color }] as Todo[];
      } else if (color !== "red") {
        return currentTodos.filter((todo) => todo.id !== id);
      }
      return currentTodos;
    });

    setYellowFilter((currentTodos: Todo[]) => {
      if (color === "yellow" && !currentTodos.some((todo) => todo.id === id)) {
        return [...currentTodos, { id, color }] as Todo[];
      } else if (color !== "yellow") {
        return currentTodos.filter((todo) => todo.id !== id);
      }
      return currentTodos;
    });

    setBlueFilter((currentTodos: Todo[]) => {
      if (color === "blue" && !currentTodos.some((todo) => todo.id === id)) {
        return [...currentTodos, { id, color }] as Todo[];
      } else if (color !== "blue") {
        return currentTodos.filter((todo) => todo.id !== id);
      }
      return currentTodos;
    });
  };

  // Use useEffect to log updated state values
  useEffect(() => {
    console.log(
      "Red filter:",
      redFilter,
      "Yellow filter:",
      yellowFilter,
      "Blue filter:",
      blueFilter
    );
  }, [redFilter, yellowFilter, blueFilter]);

  const deleteTodo = (id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.filter((todo: Todo) => todo.id !== id);
    });
  };

  return (
    <div className=" bg-[#919C8F] w-full h-screen">
      <div className="flex justify-center items-center flex-col fixed w-full h-full">
        <h2 className="text-white text-4xl mb-6 font-light">Your todo.</h2>
        <TodoForm addTodo={addTodo} />
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleFiltering("red")}
            className="w-4 h-4 rounded-[100%] bg-[#E63A3A]"
          ></button>
          <button
            onClick={handleFiltering("yellow")}
            className="w-4 h-4 rounded-[100%] bg-[#EFDE82]"
          ></button>
          <button
            onClick={handleFiltering("blue")}
            className="w-4 h-4 rounded-[100%] bg-[#75C9F8]"
          ></button>
          <button
            onClick={handleFiltering("all")}
            className="w-4 h-4 rounded-[100%] border-2 border-white"
          ></button>
        </div>
        <TodoList
          todos={todos}
          redFilter={redFilter}
          yellowFilter={yellowFilter}
          blueFilter={blueFilter}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          setTodoColor={setTodoColor}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;
