import React from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
export default function login() {
  return (
    <div id="login">
      <div className="login_left">
        <div className="login_left_box_text">
          <span className="login_left_text_login">Log In</span>
          <span className="login_left_text_welcomeback">
            <p>WELCOME</p>
            <p>BACK</p>
          </span>
          <span className="login_left_text_secondtext">
            <p className="sous_text_login">
              Sign back in to your account to post like other users and have a
              custum profile.
            </p>
          </span>
        </div>
      </div>
      <div className="login_right">
        <div className="login_right_box">
          <h2 className="login_right_title">Your Account</h2>

          <form className="login_form" action="">
            <div className="input_container">
              <label for="email">EMAIL</label>
              <input
                className="login_input"
                type="email"
                name="email"
                id="email"
                placeholder=""
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
            </div>
            <div className="input_container">
              <label for="password">PASSWORD</label>
              <input
                className="login_input"
                type="password"
                name="password"
                placeholder=""
                required
              />
            </div>
            <div>
              <button className="login_button_form">LOG IN</button>
            </div>
          </form>
          <div className="login_form_line">
            <div>DON'T HAVE AN ACCOUNT ?</div>
            <div>
              {" "}
              <NavLink to={"/signup"} className="login_form_signup">
                SIGN UP
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
