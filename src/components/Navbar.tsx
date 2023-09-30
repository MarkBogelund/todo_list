import { Link } from "react-router-dom";
import { colors } from "../App";
import { Home } from "@mui/icons-material";

function Navbar() {
  return (
    <div className="absolute top-4 w-full z-50 flex justify-between items-center">
      <Link to="/">
        <button
          className={`bg-[${colors.cardNotDone}] p-2 ml-4 rounded-full text-white text-sm font-thin`}
        >
          <Home />
        </button>
      </Link>
      <div className="flex items-center mr-4">
        <Link to="/signup">
          <button
            className={`bg-[${colors.cardNotDone}] px-4 py-2 rounded-full text-white text-sm mr-2 font-thin`}
            onClick={() => console.log("clicked")}
          >
            Sign up
          </button>
        </Link>
        <Link to="/login">
          <button
            className={`bg-[${colors.cardNotDone}] px-4 py-2 rounded-full text-white text-sm font-thin`}
          >
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
