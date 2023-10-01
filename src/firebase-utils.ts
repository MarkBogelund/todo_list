import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Todo } from "./App";
import { User } from "firebase/auth";

// Fetches todos from the database and invokes the callback with the todos
export const fetchTodosFromDatabase = (
  user: User | null,
  callback: (todos: Todo[]) => void
) => {
  // If there is no user, invoke the callback with an empty array
  if (!user) {
    callback([]);
    return;
  }

  // Fetch todos from Firestore and render on initial load
  const todoCollection = collection(firestore, "todos");

  // Query todos by user id and order by creation date
  const q = query(
    todoCollection,
    where("uid", "==", user.uid),
    orderBy("createdAt")
  );

  // Subscribe to the query and invoke the callback to render the todos
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedTodos: Todo[] = snapshot.docs.map((doc) => doc.data() as Todo);
    callback(fetchedTodos);
  });

  // This function can be called when you want to stop listening to the updates
  return unsubscribe;
};

// Adds a todo to the database
export const addTodoToDatabase = async (
  todo: Todo,
  user: User | null
): Promise<Todo> => {
  try {
    if (user) {
      await setDoc(doc(firestore, "todos", todo.id), {
        uid: user.uid,
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        color: todo.color,
        subtext: todo.subtext,
        createdAt: serverTimestamp(), // adding a timestamp here
      });
    }

    console.log("Document added with ID: ", todo.id);

    return todo;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const updatePropertyInDatabase = async (
  id: string,
  propKey: string,
  propValue: boolean | string,
  user: User | null
): Promise<void> => {
  if (user) {
    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // First, get the document to ensure it belongs to the user
      const todoSnapshot = await getDoc(todoRef);

      if (!todoSnapshot.exists()) {
        console.error("Document does not exist");
        return;
      }

      const todoData = todoSnapshot.data();

      // Ensure the todo belongs to the user
      if (todoData?.uid === user.uid) {
        // Update the prop on the todo in Firestore
        await updateDoc(todoRef, {
          [propKey]: propValue,
        });
        console.log("Document updated successfully!");
      } else {
        console.error("User does not have permission to update this document");
      }
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
    }
  }
};

// Deletes a todo from the database
export const deleteTodoFromDatabase = async (
  id: string,
  user: User | null
): Promise<void> => {
  if (user) {
    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, "todos", id);

    try {
      // First, get the document to ensure it belongs to the user
      const todoSnapshot = await getDoc(todoRef);

      if (!todoSnapshot.exists()) {
        console.error("Document does not exist");
        return;
      }

      const todoData = todoSnapshot.data();

      // Ensure the todo belongs to the user
      if (todoData?.uid === user.uid) {
        // Delete the todo from Firestore
        await deleteDoc(todoRef);
        console.log("Document deleted successfully!");
      } else {
        console.error("User does not have permission to delete this document");
      }
    } catch (error) {
      console.error("Error deleting document in Firestore:", error);
    }
  }
};
