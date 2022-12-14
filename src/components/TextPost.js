import React from "react";
import { Link } from "react-router-dom";

function TextPost({ text, userID, userName }) {
  return (
    <div className="TextPost">
      <p className="Text">{text}</p>
      <p>
        Posted by: {userName} <Link to={`user/${userID}`}>{userName}</Link>
      </p>
    </div>
  );
}

export default TextPost;
