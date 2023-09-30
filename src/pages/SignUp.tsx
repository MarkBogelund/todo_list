import { useState } from "react";
import { colors } from "../App";
import { AuthProvider, UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`w-[30%] h-[60%] bg-[${colors.listBackground}] rounded-md flex flex-col justify-start items-center`}
      >
        <h1 className="text-white text-3xl font-thin mt-[22%]">
          Create an account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-col w-full items-center justify-start">
            <input
              className="w-[70%] h-10 rounded-full bg-[#7daa8b] text-white placeholder-white pl-4 font-light outline-none mt-10"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[70%] h-10 rounded-full bg-[#7daa8b] text-white placeholder-white pl-4 font-light outline-none mt-4"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-[50%] h-10 rounded-full bg-[#7daa8b] text-white font-light mt-10"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
