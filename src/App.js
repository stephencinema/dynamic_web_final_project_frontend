import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// styles and components
import "./App.css";
import RegisterPage from "./pages/Register";
import CreatePostPage from "./pages/CreatePost";
import DashboardPage from "./pages/Dashboard";
import ExploreCommunitiesPage from "./pages/ExploreCommunities";
import LoginPage from "./pages/Login";
import UserOverviewPage from "./pages/UserOverview";

const firebaseConfig = {
  apiKey: "AIzaSyD-gK5aLYHdUOVNAfqGdi-7Zy2TMqQlhYw",
  authDomain: "dynamic-web-final-project-2022.firebaseapp.com",
  projectId: "dynamic-web-final-project-2022",
  storageBucket: "dynamic-web-final-project-2022.appspot.com",
  messagingSenderId: "158628628958",
  appId: "1:158628628958:web:09109608138c5e2530754f",
};

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  // ensure app is initialized when it is ready to be
  useEffect(() => {
    // initialize firebase
    const app = initializeApp(firebaseConfig);
    setAppInitialized(app);
  }, []);
  // check to see if user is logged in
  // user loads page, check their status
  // set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // user is signed in
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          // user is signed out
          setUserInformation({});
          setIsLoggedIn(false);
        }
        // whenever state changes setLoading to false
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DashboardPage
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/user/:id",
      element: (
        <UserOverviewPage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/explore",
      element: (
        <ExploreCommunitiesPage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/create",
      element: (
        <CreatePostPage
          app={initializeApp}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/register",
      element: (
        <RegisterPage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/login",
      element: <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
