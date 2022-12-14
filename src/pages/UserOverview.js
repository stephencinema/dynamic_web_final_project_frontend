import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function UserOverviewPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation, userInformation }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <div className="PageWrapper">
        <h1>User Overview</h1>
        <p>
          <strong>Display Name: </strong>
          {userInformation.displayName}
        </p>
        <p>
          <strong>Email: </strong>
          {userInformation.email}
        </p>
        <p>
          <strong>User ID: </strong>
          {userInformation.uid}
        </p>
      </div>
    </>
  );
}

export default UserOverviewPage;
