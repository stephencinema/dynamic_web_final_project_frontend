import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CreateUserForm from "../components/CreateUserForm";
import { Link } from "react-router-dom";

function RegisterPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const signUpUser = useCallback(
    (e) => {
      e.preventDefault();

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      console.log({ email, password });

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setUserInformation({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            accessToken: user.accessToken,
          });
          setErrors();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
        });
    },
    [setErrors, setIsLoggedIn, setUserInformation]
  );
  return (
    <>
      <h1 className="LoginLogo">The Box Office</h1>
      <h1 className="LoginLogo">The Box Office</h1>
      <h1 className="LoginLogo">The Box Office</h1>
      <div className="LoginWrapper">
        <CreateUserForm signUpUser={signUpUser} />
        <p>{errors}</p>
        <a className="BoldLoginText">Already have an account?</a>
        <a className="BoldLoginText">
          <Link to="/login">Login</Link>
        </a>
      </div>
    </>
  );
}

export default RegisterPage;
