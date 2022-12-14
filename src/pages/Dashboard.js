import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import TextPost from "../components/TextPost";

function DashboardPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <div className="PageWrapper">
        <div className="TextPostWrapper">
          <TextPost />
          <TextPost />
          <TextPost />
          <TextPost />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
