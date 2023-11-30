import React from 'react';
import './Login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../../Context/Usercontext';
import { useContext } from 'react';

export default function Login() {
  const [emailUser, setEmail] = useState('');
  const { value } = useContext(UserContext);
  const [passwordUser, setPassword] = useState('');
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault();
    console.log(emailUser);
    try {
      const response = await fetch(
        'https://studysmart-production.up.railway.app/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailUser,
            password: passwordUser,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        // Gérer la réponse en cas de succès (par exemple, redirection ou affichage d'un message)
        if (userData) {
          // Stockez le token de l'utilisateur dans le localStorage
          value.login(userData);
          navigate('/home');
        } else {
          // le cas où le token n'est pas retourné
          console.error('Token non reçu');
        }
      } else {
        // Gérer les erreurs de réponse
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      // Gérer les erreurs de réseau ou autres exceptions
    }
  };

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

          <form className="login_form" onSubmit={submitLogin}>
            <div className="input_container">
              <label htmlFor="email">EMAIL</label>

              <input
                className="login_input"
                type="email"
                name="email"
                id="email"
                placeholder=""
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={emailUser}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="password">PASSWORD</label>
              <input
                className="login_input"
                type="password"
                name="password"
                placeholder=""
                value={passwordUser}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input className="login_button_form" value="LOG IN" type="submit" />
          </form>
          <div className="login_form_line">
            <div>DON'T HAVE AN ACCOUNT ?</div>
            <div>
              {' '}
              <NavLink to={'/signup'} className="login_form_signup">
                SIGN UP
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
