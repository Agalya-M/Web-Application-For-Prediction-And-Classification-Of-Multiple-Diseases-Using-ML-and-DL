import React from "react";
import { useNavigate } from "react-router-dom";
import { navBarOptions } from "../../Utils/utils";
import "./navBarStyles.css";

const NavBar = () => {
  const navigate = useNavigate();
  const onPressHandler = (path) => {
    navigate(path);
  };
  return (
    <div className="nav-container">
      {navBarOptions.map((item) => {
        return (
          <p key={item.id} onClick={() => onPressHandler(item.path)}>
            {item.title}
          </p>
        );
      })}
    </div>
  );
};

export default NavBar;
