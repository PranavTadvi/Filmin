import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center  text-red-500 p-5 font-bold border-b-2 border-gray-500">
        <Link to={"/"}>
          <span>
            Film<span className="text-white">in</span>
          </span>
        </Link>

        <div>
          <Link to={"/addmovie"}>
            <Button>
              <AddIcon className="mr-2 font-bolt" />
              <span className="text-white">Add New</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
