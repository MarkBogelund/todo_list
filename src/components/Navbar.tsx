import { Link } from "react-router-dom";
import { colors } from "../App";
import { Home } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div className="absolute top-4 w-full z-50 flex justify-between items-center">
      <Link to="/">
        <button
          className={`bg-[${colors.cardNotDone}] p-2 ml-4 rounded-full text-white text-sm font-thin`}
        >
          <Home />
        </button>
      </Link>
      {user ? (
        <button
          className={`bg-[${colors.cardNotDone}] p-2 mr-4 rounded-full text-white text-sm font-thin`}
          onClick={handleLogout}
        >
          Log out
        </button>
      ) : (
        <div className="flex justify-end items-center">
          <Link to="/signup">
            <button
              className={`bg-[${colors.cardNotDone}] p-2 mr-4 rounded-full text-white text-sm font-thin`}
            >
              Sign up
            </button>
          </Link>
          <Link to="/login">
            <button
              className={`bg-[${colors.cardNotDone}] p-2 mr-4 rounded-full text-white text-sm font-thin`}
            >
              Log in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
