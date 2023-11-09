import React from "react";
import "./Login.css";
export default function login() {
  return (
    <div id="login">
      <div className="login_left">
        <div className="login_left_box_text">
          <span className="login_left_text_login">Log In</span>
          <span className="login_left_text_welcomeback">
            <p>WELCOME</p>
            <br />
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
              <p>EMAIL</p>
              <input className="login_input" type="text" />
            </div>
            <div className="input_container">
              <p>PASSWORD</p>
              <input className="login_input" type="text" />
            </div>
            <div>
              <button className="login_button_form">LOG IN</button>
            </div>
          </form>
          <div className="login_form_line">
            <div>DON'T HAVE AN ACCOUNT ?</div>
            <div>SIGN UP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
