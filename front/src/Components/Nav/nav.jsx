import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/Usercontext';

export default function Nav() {
  const { value } = useContext(UserContext);
  return (
    <div className="nav">
      <div className="nav_box_profil">
        <i className="fa-regular fa-user"></i>
        <NavLink to={'/profile'} className="nav_button_profil">
          PROFILE
        </NavLink>
      </div>
      <div className="nav_box_title">
        <NavLink to={'/'} className="nav_title">
          StudySmart
        </NavLink>
      </div>
      <div className="nav_box_box_auth">
        {!value.currentUser ? (
          <>
            <NavLink to={'/login'} className="nav_button_login">
              login
            </NavLink>
            <NavLink to={'/signup'} className="nav_button_signup">
              sign up
            </NavLink>
          </>
        ) : (
          <NavLink to={'/login'} className="">
            <i
              onClick={() => value.logout()}
              className="fa-solid fa-right-from-bracket"
              style={{ color: 'white' }}
            ></i>
          </NavLink>
        )}
      </div>
    </div>
  );
}
