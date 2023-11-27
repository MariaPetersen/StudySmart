import React from 'react'
import './Profile.css'

var loadFile = function (e) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(e.target.files[0]);
};
  
export default function Profile() {
  return (
    <div>
        <div className='title'>
            <p className='top-title'>Welcome Back</p>
            <h1 className='sub-title'>MY ACCOUNT</h1>
        </div>
        <div className='profile-container'>
            <p className='profile-title'>YOUR DETAILS</p>

            <div className="profile-picture-container">
                <img className="profile-picture-output" src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output" />
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
              />
            </div>
            <div className='input'>
              <label htmlFor="password">FIRST NAME</label>
              <input
                className="login-input"
                name="firstname"
                placeholder=""
                required
              />
            </div>
            <div className='input'>
              <label htmlFor="password">LAST NAME</label>
              <input
                className="login-input"
                name="lastname"
                placeholder=""
                required
              />
            </div>
            <div>
                <button type="button" className='profile-button'>SAVE CHANGES</button>
            </div>
          </form>

          <div className='profile-border'></div>

          <p className='profile-posts-title'>YOUR POSTS</p>

          <div className='profile-posts-container'>
            <div>
                
            </div>
          </div>
        </div>
    </div>
  )
}