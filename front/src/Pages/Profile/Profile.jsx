import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/Usercontext';
import { useContext } from 'react';
import './Profile.css';

export default function Profile() {
  const [userProfile, setUserProfile] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    posts: [],
  });
  const { value } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  var uploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);
    const response = await fetch(`http://localhost:3001/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${value.currentUser?.token.token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const profilePicture = await response.json();
      setProfilePicture(profilePicture.remotePath);
    }
  };
  const fetchUserProfile = useCallback(async () => {
    console.log(value);
    try {
      if (!isAuthenticated) {
        return;
      }
      console.log('here');
      const response = await fetch(
        `https://studysmart-production.up.railway.app/profile/${value.currentUser?.token.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value.currentUser?.token.token}`,
          },
        }
      );

      if (response.ok) {
        const profileData = await response.json();
        setUserProfile(profileData.user);
        setProfilePicture(profileData.profilePicture.remotePath);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [value, isAuthenticated]);

  useEffect(() => {
    if (value.currentUser) {
      setIsAuthenticated(true);
      fetchUserProfile();
    }
  }, [value.currentUser, fetchUserProfile]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://studysmart-production.up.railway.app/profile/${value.currentUser?.token.userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value.currentUser?.token.token}`,
          },
          body: JSON.stringify({
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            email: userProfile.email,
            password: userProfile.password,
          }),
        }
      );

      if (response.ok) {
        console.log('User profile updated successfully');
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <div className="title">
        <p className="top-title">Welcome Back</p>
        <h1 className="sub-title">MY ACCOUNT</h1>
      </div>
      <div className="profile-container">
        <p className="profile-title">YOUR DETAILS</p>

        <div className="profile-picture-container">
          <img
            className="profile-picture-output"
            src={
              profilePicture ? profilePicture : './image-post-placeholder.png'
            }
            id="output"
            alt="profile_picture"
          />
          <label className="profile-button" htmlFor="file">
            <span>EDIT PROFILE PICTURE</span>
          </label>
          <input
            className="profile-picture-input"
            id="file"
            type="file"
            onChange={uploadFile}
          />
        </div>

        <form className="input-container" action="">
          <div className="input">
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
              onChange={(e) =>
                setUserProfile({ ...userProfile, email: e.target.value })
              }
            />
          </div>
          <div className="input">
            <label htmlFor="password">PASSWORD</label>
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder=""
              required
              value={userProfile.password}
              onChange={(e) =>
                setUserProfile({ ...userProfile, password: e.target.value })
              }
            />
          </div>
          <div className="input">
            <label htmlFor="password">FIRST NAME</label>
            <input
              className="login-input"
              name="firstname"
              placeholder=""
              required
              value={userProfile.firstname}
              onChange={(e) =>
                setUserProfile({ ...userProfile, firstname: e.target.value })
              }
            />
          </div>
          <div className="input">
            <label htmlFor="password">LAST NAME</label>
            <input
              className="login-input"
              name="lastname"
              placeholder=""
              required
              value={userProfile.lastname}
              onChange={(e) =>
                setUserProfile({ ...userProfile, lastname: e.target.value })
              }
            />
          </div>
          <div>
            <button
              type="button"
              className="profile-button"
              onClick={handleSaveChanges}
            >
              SAVE CHANGES
            </button>
          </div>
        </form>

        <div className="profile-border"></div>

        <p className="profile-posts-title">YOUR POSTS</p>

        <div className="profile-posts-container">
          <div className="post-container">
            <div className="post-header">
              <p className="post-title">USERNAME</p>
              <p className="post-title">POST DATE</p>
            </div>
            <p className="post-content">POST CONTENT</p>
            <img
              className="post-image"
              src="./image-post-placeholder.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
