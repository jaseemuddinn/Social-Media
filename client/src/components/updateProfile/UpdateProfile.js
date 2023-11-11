import React from "react";
import "./UpdateProfile.scss";
import userImg from "../../assests/profile.png";

function UpdateProfile() {
  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
          <img className="userImg" src={userImg} alt="userProfile" />
        </div>
        <div className="right-part">
          <form>
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Your Bio" />

            <input type="submit" className="btn-primary" />
          </form>
          <button className="btn-secondary delete-btn">Delete Profile</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
