import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import TextPost from "../components/TextPost";

const queryData = async (app) => {
  if (!app) return [];
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "posts"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

function DashboardPage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    if (!app) return;
    queryData(app).then(setPostData);
  }, [app]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <div className="PageWrapper">
        <div className="TextPostWrapper">
          {postData.map((post) => (
            <TextPost text={post.text} userId={post.userId} userName="user00" />
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
