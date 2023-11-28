import React from "react";
import "./signup.css";
export default function Signin() {
  return (
    <div id="signup">
      <div className="signup_left">
        <h1
          style={{
            fontFamily: "GT Bold",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          {" "}
          <span>CREATE</span>
          <span className="an">an</span>
          <span>ACCOUNT</span>
        </h1>
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
              <div className="separator"></div>
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
              <button className="signup_button_form">SIGN UP</button>
            </div>
          </form>
          <div className="signup_form_line">
            <div>DON'T HAVE AN ACCOUNT ?</div>
            <div>SIGN UP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
