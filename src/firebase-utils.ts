import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Todo } from "./App";

// Adds a todo to the database
export const addTodoToDatabase = async (todo: Todo): Promise<Todo> => {
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

// Updates a prop on a specific todo in the database
export const updatePropertyInDatabase = async (
  id: string,
  propKey: string,
  propValue: boolean | string
): Promise<void> => {
  // Reference to the specific todo in Firestore
  const todoRef = doc(firestore, "todos", id);

  try {
    // Use a computed property name to update the specific property in Firestore
    await updateDoc(todoRef, {
      [propKey]: propValue,
    });
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document in Firestore:", error);
  }
};

// Deletes a todo from the database
export const deleteTodoFromDatabase = async (id: string): Promise<void> => {
  // Reference to the specific todo in Firestore
  const todoRef = doc(firestore, "todos", id);

  try {
    // Delete the todo from Firestore
    await deleteDoc(todoRef);
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document in Firestore:", error);
  }
};
