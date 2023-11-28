import React, { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import './Profile.css';

var loadFile = function (e) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(e.target.files[0]);
};

export default function Profile() {
  const [userProfile, setUserProfile] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    posts: [],
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Check if the user is authenticated
      if (!isAuthenticated) {
        // Redirect the user to the login page or any other page
        return;
      }

      const response = await fetch('https://studysmart-production.up.railway.app/profile/{userId}', {
        method: 'GET',
        headers: {
          // Add any headers if needed, like authentication tokens
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        setUserProfile(profileData);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!isAuthenticated) {
    return <redirect to="/login" />;
  }

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('https://studysmart-production.up.railway.app/profile/{userId}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any headers if needed, like authentication tokens
        },
        body: JSON.stringify({
          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          email: userProfile.email,
          password: userProfile.password,
        }),
      });

      if (response.ok) {
        console.log('User profile updated successfully');
      } else {
        // Handle error
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  return (
    <div>
        <div className='title'>
            <p className='top-title'>Welcome Back</p>
            <h1 className='sub-title'>MY ACCOUNT</h1>
        </div>
        <div className='profile-container'>
            <p className='profile-title'>YOUR DETAILS</p>

            <div className="profile-picture-container">
                <img className="profile-picture-output" src="./image-post-placeholder.png" id="output" />
                <label class="profile-button" htmlFor="file">
                    <span>EDIT PROFILE PICTURE</span>
                </label>
                <input className='profile-picture-input' id="file" type="file" onChange={loadFile} />
            </div>

            <form className="input-container" action="">
            <div className='input'>
              <label htmlFor="email">EMAIL</label>
              <input
                className="login-input"
                type="email"
                name="email"
                id="email"
                placeholder=""
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              />
            </div>
            <div className='input'>
              <label htmlFor="password">PASSWORD</label>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder=""
                required
                value={userProfile.password}
                onChange={(e) => setUserProfile({ ...userProfile, password: e.target.value })}
              />
            </div>
            <div className='input'>
              <label htmlFor="password">FIRST NAME</label>
              <input
                className="login-input"
                name="firstname"
                placeholder=""
                required
                value={userProfile.firstname}
                onChange={(e) => setUserProfile({ ...userProfile, firstname: e.target.value })}
              />
            </div>
            <div className='input'>
              <label htmlFor="password">LAST NAME</label>
              <input
                className="login-input"
                name="lastname"
                placeholder=""
                required
                value={userProfile.lastname}
                onChange={(e) => setUserProfile({ ...userProfile, lastname: e.target.value })}
              />
            </div>
            <div>
                <button type="button" className='profile-button' onClick={handleSaveChanges}>SAVE CHANGES</button>
            </div>
          </form>

          <div className='profile-border'></div>

          <p className='profile-posts-title'>YOUR POSTS</p>

          <div className='profile-posts-container'>
            <div className='post-container'>
              <div className='post-header'>
                <p className='post-title'>USERNAME</p>
                <p className='post-title'>POST DATE</p>
              </div>
                <p className='post-content'>POST CONTENT</p>
                <img className='post-image' src="./image-post-placeholder.png" alt="" />
            </div>
            <div className='post-container'>
              <div className='post-header'>
                <p className='post-title'>USERNAME</p>
                <p className='post-title'>POST DATE</p>
              </div>
                <p className='post-content'>POST CONTENT</p>
                <img className='post-image' src="./image-post-placeholder.png" alt="" />
            </div>
            <div className='post-container'>
              <div className='post-header'>
                <p className='post-title'>USERNAME</p>
                <p className='post-title'>POST DATE</p>
              </div>
                <p className='post-content'>POST CONTENT</p>
                <img className='post-image' src="./image-post-placeholder.png" alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}