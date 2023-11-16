import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav_box_profil">
        <i className="fa-regular fa-user"></i>
        <NavLink className="nav_button_profil">profil</NavLink>
      </div>
      <div className="nav_box_title">
        <h1 className="nav_title">StudySmart</h1>
      </div>
      <div className="nav_box_box_auth">
        <i
          className="fa-solid fa-right-from-bracket"
          style={{ color: "white" }}></i>
        <NavLink to={"/"} className="nav_button_login">
          login
        </NavLink>
        <NavLink to={"/signup"} className="nav_button_signup">
          sign up
        </NavLink>
      </div>
    </div>
  );
}
