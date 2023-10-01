import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Todo } from "./App";
import { User } from "firebase/auth";

// Adds a todo to the database
export const addTodoToDatabase = async (
  todo: Todo,
  user: User | null
): Promise<Todo> => {
  try {
    if (user) {
      await setDoc(doc(firestore, user.uid, todo.id), {
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

// Updates a prop on a specific todo in the database
export const updatePropertyInDatabase = async (
  id: string,
  propKey: string,
  propValue: boolean | string,
  user: User | null
): Promise<void> => {
  if (user) {
    // Reference to the specific todo in Firestore
    const todoRef = doc(firestore, user.uid, id);

    try {
      // Update the prop on the todo in Firestore
      await updateDoc(todoRef, {
        [propKey]: propValue,
      });
      console.log("Document updated successfully!");
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
    const todoRef = doc(firestore, user.uid, id);

    try {
      // Delete the todo from Firestore
      await deleteDoc(todoRef);
      console.log("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document in Firestore:", error);
    }
  }
};
