import React from "react";
import "./signup.css";
export default function Signin() {
  return (
    <div id="signup">
      <div className="signup_left">
        <h1>CREATE AN ACCOUNT</h1>
        <p>Create an account in order to post like other </p>
        <p> users and have a custum profile</p>
      </div>
      <div className="signup_right">
        <div className="signup_right_box">
          <h2></h2>
          <form className="signup_form" action="">
            <div className="input_container">
              <span> EMAIL</span>
              <input className="signup_input" type="text" placeholder="Email" />
            </div>
            <div className="double_input">
              <div className="first_name">
                <span>FIRST NAME</span>
                <input
                  className="signup_input"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="last_name">
                <span>LAST NAME</span>
                <input
                  className="signup_input"
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div>
              <span>USERNAME</span>
              <input
                className="signup_input"
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <span>PASSWORD</span>
              <input
                className="signup_input"
                type="password"
                placeholder="Password"
              />
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
