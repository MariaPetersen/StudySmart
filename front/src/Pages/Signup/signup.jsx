import React from 'react';
import './signup.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function Signin() {
  const [emailUser, setEmail] = useState('');
  const [firstNameUser, setFirstName] = useState('');
  const [lastNameUser, setLastName] = useState('');
  const [userNameUser, setUsername] = useState('');
  const [passwordUser, setPassword] = useState('');
  const navigate = useNavigate();
  const submitSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://studysmart-production.up.railway.app/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailUser,
            firstname: firstNameUser,
            lastname: lastNameUser,
            username: userNameUser,
            password: passwordUser,
          }),
        }
      );

      if (response.ok) {
        navigate('/login');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      // Gérer les erreurs de réseau ou autres exceptions
    }
  };

  return (
    <div id="signup">
      <div className="signup_left">
        <h1
          style={{
            fontFamily: 'GT Bold',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
          }}
        >
          {' '}
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
          <form className="signup_form" onSubmit={submitSignup}>
            <div className="input_container">
              <span> EMAIL</span>
              <input
                className="signup_input"
                type="text"
                placeholder="Email"
                value={emailUser}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="double_input">
              <div className="first_name">
                <span>FIRST NAME</span>
                <input
                  className="signup_input"
                  type="text"
                  placeholder="First name"
                  value={firstNameUser}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="separator"></div>
              <div className="last_name">
                <span>LAST NAME</span>
                <input
                  className="signup_input"
                  type="text"
                  placeholder="Last name"
                  value={lastNameUser}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <span>USERNAME</span>
              <input
                className="signup_input"
                type="text"
                placeholder="Username"
                value={userNameUser}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <span>PASSWORD</span>
              <input
                className="signup_input"
                type="password"
                placeholder="Password"
                value={passwordUser}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input
              className="signup_button_form"
              type="submit"
              value="SIGN UP"
            />
          </form>
          <div className="signup_form_line">
            <div></div>
            <div>
                <NavLink to={'/'} className="signup_form_login">
                LOGIN
                </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
