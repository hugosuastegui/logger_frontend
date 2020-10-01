import React from "react";
import { Link } from "react-router-dom";

function Badge({ user }) {
  return (
    <div>
      <img
        style={{ width: "5rem", borderRadius: "50%" }}
        src={user.photo}
        alt="UserPhoto"
      />
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
