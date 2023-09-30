import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  color: string;
  subtext: string;
};

export const colors = {
  red: "#E63A3A",
  yellow: "#EFDE82",
  blue: "#75C9F8",

  cardNotDone: "#7daa8b",
  cardDone: "#3c6f69",
  listBackground: "#486150",
  backround: "#657a70",
};

function App() {
  return (
    <div className=" bg-[#657a70] w-full h-screen -z-10">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
