import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";
const Header = () => {
  const useAppState = useContext(AppState);
  return (
    <>
      <div className="sticky header top-0 flex justify-between items-center  text-red-500 p-5 font-bold border-b-2 border-gray-500">
        <Link to={"/"}>
          <span>
            Film<span className="text-white">in</span>
          </span>
        </Link>

        <div>
          {useAppState.login ? (
            <Link to={"/addmovie"}>
              <Button>
                <AddIcon className="mr-2 font-bolt" />
                <span className="text-white">Add New</span>
              </Button>
            </Link>
          ) : (
            <Link to={"/login"} className="bg-green-500 p-2 text-center">
              <Button>
                <span className="text-white">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
