import React from "react";
import { Link } from "react-router-dom";

const imgStyle = {
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
  borderRadius: "50%",
};

function Badge({ user }) {
  return (
    <div>
      <img style={imgStyle} src={user.photo} alt="UserPhoto" />
      <br />
      <br />
      {user.name ? (
        <h2>{user.name}</h2>
      ) : (
        <div>
          <Link to="/settings">Complete your profile</Link>
        </div>
      )}
      <h4>{user.email}</h4>
    </div>
  );
}

export default Badge;
