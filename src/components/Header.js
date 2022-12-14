import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({ setIsLoggedIn, setUserInformation }) {
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  return (
    <div className="Header">
      <h1 className="Logo"><Link to="/">The Box Office</Link></h1>
      <nav>
        <p>
          <Link to="/user/0">Profile</Link>
        </p>
        <p>
          <Link to="/">Explore Communities</Link>
        </p>

        <p onClick={() => logout()}>Log Out</p>

        <button className="Button">
          <Link to="/create">New Post</Link>
        </button>
      </nav>
    </div>
  );
}

export default Header;
