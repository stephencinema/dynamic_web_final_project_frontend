import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
      const name = e.currentTarget.name.value;
  
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setErrors();

          updateProfile(user, { displayName: name })
            .then(() => {
              setUserInformation({
                email: user.email,
                displayName: name,
                uid: user.uid,
                accessToken: user.accessToken,
              });
            })
            .catch((err) => {
              const errorCode = err.code;
              const errorMessage = err.message;
              console.warn({ err, errorCode, errorMessage });
              setErrors(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
          setErrors(errorMessage);
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
        <p className="BoldLoginText">Already have an account?</p>
        <button className="BoldLoginText">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </>
  );
}

export default RegisterPage;
