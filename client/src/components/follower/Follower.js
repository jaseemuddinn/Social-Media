import React from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";

function Follower() {
  return (
    <div className="part-one">
      <div className="Follower">
        <div className="user-info">
          <Avatar />
          <h4 className="name">Ayush</h4>
        </div>
        <h5 className="hover-link follow-link">Follow</h5>
      </div>
    </div>
  );
}

export default Follower;
