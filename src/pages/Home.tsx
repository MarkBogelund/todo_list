import { useEffect, useState } from "react";
import { Todo } from "../App";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ColorFilter from "../components/ColorFilter";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

function Home() {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, "todos")),
      (snapshot) => {
        const fetchedTodos: Todo[] = [];
        snapshot.forEach((doc) => {
          fetchedTodos.push(doc.data() as Todo);
        });
        setTodos(fetchedTodos);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from Firestore and render on initial load
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, "todos")),
      (snapshot) => {
        const fetchedTodos: Todo[] = [];
        snapshot.forEach((doc) => {
          fetchedTodos.push(doc.data() as Todo);
        });
        setTodos(fetchedTodos);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

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
    addTodoToDatabase(newTodo);

    // Update local state
    setTodos((currentTodos: Todo[]) => {
      return [...currentTodos, newTodo];
    });
  };
  // Logic for adding a new todo to Firestore
  const addTodoToDatabase = async (todo: Todo): Promise<Todo> => {
    try {
      // Set the Firestore document ID explicitly to the todo's ID
      await setDoc(doc(firestore, "todos", todo.id), {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        color: todo.color,
        subtext: todo.subtext,
      });

      console.log("Document added with ID: ", todo.id);

      return todo;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

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

  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(todos));
  // }, [todos]);

  // Update the 'completed' state in Firestore and local state
  const toggleTodo = async (id: string, completed: boolean) => {
    // Update local state first
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });

    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // Update the 'completed' state in Firestore
      await updateDoc(todoRef, {
        completed: completed,
      });
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
    }
  };

  // Update the 'color' state in Firestore and local state
  const setTodoColor = async (id: string, color: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, color };
        }
        return todo;
      });
    });

    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // Update the 'color' in Firestore
      await updateDoc(todoRef, {
        color: color,
      });
      console.log("Color updated successfully!");
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
    }

    addToFilter(id, color);
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

    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // Update the 'subtext' in Firestore
      updateDoc(todoRef, {
        subtext: newSubtext,
      });
      console.log("Subtext updated successfully!");
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
    }
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

    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // Update the 'title' in Firestore
      updateDoc(todoRef, {
        title: newTitle,
      });
      console.log("Title updated successfully!");
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
    }
  };

  // Delete a todo from Firestore and local state
  const deleteTodo = (id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.filter((todo: Todo) => todo.id !== id);
    });

    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // Delete the todo from Firestore
      deleteTodoFromDatabase(todoRef);
      console.log("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document in Firestore:", error);
    }
  };

  // Logic for deleting a todo from Firestore
  const deleteTodoFromDatabase = async (todoRef: any) => {
    try {
      await deleteDoc(todoRef);
      console.log("Document deleted with ID: ", todoRef.id);
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
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
