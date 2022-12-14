import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const loginUser = useCallback(
    (e) => {
      e.preventDefault();
      // assign email and password to variables from form
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // since the user is true, set logged in
          setIsLoggedIn(true);
          // provide some information about the user via setState
          setUserInformation({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            accessToken: user.accessToken,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
          setErrors(errorMessage);
        });
    },
    [setIsLoggedIn, setUserInformation]
  );

  return (
    <>
      <h1 className="LoginLogo">The Box Office</h1>
      <h1 className="LoginLogo">The Box Office</h1>
      <h1 className="LoginLogo">The Box Office</h1>
      <div className="LoginWrapper">
        <LoginForm loginUser={loginUser} />
        <p>{errors}</p>
        <p className="BoldLoginText">Don't have an account?</p>
        <button className="BoldLoginText">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </>
  );
}

export default LoginPage;
