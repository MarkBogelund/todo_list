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

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (item: string) => {
    setTodos((currentTodos: Todo[]) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: item!,
        completed: false,
        color: "red",
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

  const deleteTodo = (id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.filter((todo: Todo) => todo.id !== id);
    });
  };

  const handleFiltering = (color: string) => () => {
    console.log("Color:", color);
    setTodos((currentTodos: Todo[]) => {
      console.log("Current todos:", currentTodos);

      return currentTodos.filter((todo: Todo) => todo.color === color);
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
            onClick={handleFiltering("green")}
            className="w-4 h-4 rounded-[100%] bg-[#75C9F8]"
          ></button>
        </div>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
