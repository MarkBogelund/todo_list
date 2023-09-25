import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
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

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col bg-gray-700">
      <TodoForm addTodo={addTodo} />
      {/* <h1 className="text-white text-xl">Todo list</h1> */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
