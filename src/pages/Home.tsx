import { useEffect, useState } from "react";
import { Todo } from "../App";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ColorFilter from "../components/ColorFilter";
import {
  addTodoToDatabase,
  updatePropertyInDatabase,
  deleteTodoFromDatabase,
  fetchTodosFromDatabase,
} from "../firebase-utils";
import { UserAuth } from "../context/AuthContext";

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { user } = UserAuth();

  // Fetch todos from Firestore on mount
  useEffect(() => {
    // When the component mounts, fetch todos and set them to the state
    const unsubscribe = fetchTodosFromDatabase(user, setTodos);

    // Cleanup function: when the component unmounts, we stop listening for updates
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // States for filtering todos by color
  const [redFilter, setRedFilter] = useState<Todo[]>([]);
  const [yellowFilter, setYellowFilter] = useState<Todo[]>([]);
  const [blueFilter, setBlueFilter] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");

  // Populate the filter states with the todos that match the color
  useEffect(() => {
    setRedFilter(todos.filter((todo: Todo) => todo.color === "red"));
    setYellowFilter(todos.filter((todo: Todo) => todo.color === "yellow"));
    setBlueFilter(todos.filter((todo: Todo) => todo.color === "blue"));
  }, [todos]);

  // Handle the filtering of todos by color
  const handleFiltering = (color: string) => {
    setFilter(color);
  };

  // Add or remove a todo from the filter states
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

  // Add a new todo to Firestore and local state
  const addTodo = (item: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: item,
      completed: false,
      color: "",
      subtext: "",
    };

    // Add to Firestore
    addTodoToDatabase(newTodo, user);

    // Update local state
    setTodos((currentTodos: Todo[]) => {
      return [...currentTodos, newTodo];
    });
  };

  // Update the 'completed' state in Firestore and local state
  const toggleTodo = (id: string, completed: boolean) => {
    // Update local state first
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });

    updatePropertyInDatabase(id, "completed", completed, user);
  };

  // Update the 'color' state in Firestore and local state
  const setTodoColor = (id: string, color: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, color };
        }
        return todo;
      });
    });

    updatePropertyInDatabase(id, "color", color, user);

    addToFilter(id, color);
  };

  // Update the 'subtext' state in Firestore and local state
  const setSubtext = (id: string, newSubtext: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, subtext: newSubtext };
        }
        return todo;
      });
    });

    updatePropertyInDatabase(id, "subtext", newSubtext, user);
  };

  // Update the 'title' state in Firestore and local state
  const setTitle = (id: string, newTitle: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      });
    });

    updatePropertyInDatabase(id, "title", newTitle, user);
  };

  // Delete a todo from Firestore and local state
  const deleteTodo = (id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.filter((todo: Todo) => todo.id !== id);
    });

    deleteTodoFromDatabase(id, user);
  };

  return (
    <div className="flex justify-center items-center flex-col fixed w-full h-full">
      <h2 className="text-white text-4xl mb-6 font-light">Your todo.</h2>
      <TodoForm addTodo={addTodo} />
      <ColorFilter
        handleColorClick={(color) => handleFiltering(color)}
        className="mb-4"
      />
      <TodoList
        todos={todos}
        redFilter={redFilter}
        yellowFilter={yellowFilter}
        blueFilter={blueFilter}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        setTodoColor={setTodoColor}
        filter={filter}
        setSubtext={setSubtext}
        setTitle={setTitle}
      />
    </div>
  );
}

export default Home;
