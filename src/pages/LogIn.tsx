import { colors } from "../App";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handlePrintErrors } from "../utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, resetPassword } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (e: any) {
      console.log(e.code);
      alert(handlePrintErrors(e.code));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email in the email field first.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (e: any) {
      console.log(e.code);
      alert(handlePrintErrors(e.code));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`w-[85%] sm:w-[55%] lg:w-[30%] h-[60%] bg-[${colors.listBackground}] rounded-md flex flex-col justify-center items-center`}
      >
        <h1 className="text-white text-3xl font-thin mt-[-10%]">Log in</h1>
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
            Log in
          </button>
          <a
            onClick={handleForgotPassword}
            className="text-white font-thin text-xs mt-4"
            href="#"
          >
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
