import React from "react";
import { Link } from "react-router-dom";

function TextPost({ text, userId, userName }) {
  return (
    <div className="TextPost">
      <p className="Text">{text}</p>
      <p>
        Posted by: <Link to={`user/${userId}`}>{userName}</Link>
      </p>
    </div>
  );
}

export default TextPost;
