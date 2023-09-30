import { colors } from "../App";

function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`w-[30%] h-[60%] bg-[${colors.listBackground}] rounded-md flex flex-col justify-start items-center`}
      >
        <h1 className="text-white text-3xl font-thin mt-[22%]">Log in</h1>
        <form className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full items-center justify-start">
            <input
              className="w-[70%] h-10 rounded-full bg-[#7daa8b] text-white placeholder-white pl-4 font-light outline-none mt-10"
              type="text"
              placeholder="Email"
            />
            <input
              className="w-[70%] h-10 rounded-full bg-[#7daa8b] text-white placeholder-white pl-4 font-light outline-none mt-4"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            className="w-[50%] h-10 rounded-full bg-[#7daa8b] text-white font-light mt-10"
            type="submit"
          >
            Log in
          </button>
          <a className="text-white font-thin text-xs mt-4" href="#">
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
