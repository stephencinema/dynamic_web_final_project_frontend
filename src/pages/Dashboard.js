import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function DashboardPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation,}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <div className="PageWrapper">
        <p>Dashboard</p>
      </div>
    </>
  );
}

export default DashboardPage;
