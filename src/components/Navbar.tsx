import { Link } from "react-router-dom";
import { colors } from "../App";
import { Menu, Login } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateIcon from "@mui/icons-material/Create";
import { UserAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const { user, logout } = UserAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  // set openMenu to false when redirecting to another page
  useEffect(() => {
    setOpenMenu(false);
  }, [window.location.pathname]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div className="absolute top-6 left-6 z-50 flex flex-col" ref={menuRef}>
        <button
          className={`bg-[${colors.cardNotDone}] rounded-full text-white text-sm font-thin w-12 aspect-square`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Menu />
        </button>
        {openMenu ? (
          <div
            className={`rounded-md my-2 bg-[${colors.cardNotDone}] flex-1 p-2`}
          >
            {user ? (
              <ul className="flex flex-col justify-evenly items-start w-full h-full mx-4 gap-2">
                <li
                  className={`text-white text-lg sm:text-sm font-thin rounded-md`}
                >
                  <PersonOutlineIcon className="mr-2" />
                  {user.email}
                </li>
                <Link to="/login">
                  <li
                    className={`text-white text-lg sm:text-sm font-thin rounded-md`}
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="mr-2" />
                    Log out
                  </li>
                </Link>
              </ul>
            ) : (
              <ul className="flex flex-col justify-evenly items-start w-full h-full mx-4">
                <Link to="/login">
                  <li
                    className={`text-white text-lg sm:text-sm font-thin rounded-md`}
                  >
                    <Login className="mr-2" />
                    Log in
                  </li>
                </Link>
                <Link to="/signup">
                  <li
                    className={`text-white text-lg sm:text-sm font-thin rounded-md`}
                  >
                    <CreateIcon className="mr-2" />
                    Sign up
                  </li>
                </Link>
              </ul>
            )}
          </div>
        ) : null}
      </div>
      {openMenu && (
        <div className="fixed top-0 left-0 bg-black w-full h-screen z-30 opacity-40 md:hidden"></div>
      )}
    </>
  );
}

export default Navbar;
