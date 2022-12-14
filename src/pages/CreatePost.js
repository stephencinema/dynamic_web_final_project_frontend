import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import CreatePostForm from "../components/CreatePostForm";
import Header from "../components/Header";

function CreatePostPage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation, userInformation}) {
  const navigate = useNavigate();

  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      const db = getFirestore(app);

      const text = e.currentTarget.text.value;
      const userName = setUserInformation.displayName;
      const userId = setUserInformation.uid;

      try {
        const docRef = await addDoc(collection(db, "posts"), {
          text,
          userId: userId,
          userName,
        });
        console.log("document written with ID: ", docRef.id);
      } catch (e) {
        console.error("error adding document: ", e);
      }
    },
    [app, userInformation]
  );

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login");
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <div className="PageWrapper">
        <CreatePostForm createPost={createPost} />
      </div>
    </>
  );
}

export default CreatePostPage;
