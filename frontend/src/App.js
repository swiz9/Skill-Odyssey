import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AddLearningPlan from "./Pages/LearningPlan/AddLearningPlan";
import AllLearningPlan from "./Pages/LearningPlan/AllLearningPlan";
import UpdateLearningPlan from "./Pages/LearningPlan/UpdateLearningPlan";
import UserLogin from "./Pages/UserManagement/UserLogin";
import UserRegister from "./Pages/UserManagement/UserRegister";
import UpdateUserProfile from "./Pages/UserManagement/UpdateUserProfile";
import NotificationsPage from "./Pages/NotificationManagement/NotificationsPage";
import AddNewPost from "./Pages/PostManagement/AddNewPost";
import AllPost from "./Pages/PostManagement/AllPost";
import UpdatePost from "./Pages/PostManagement/UpdatePost";
import UserProfile from "./Pages/UserManagement/UserProfile";
import MyAllPost from "./Pages/PostManagement/MyAllPost";
import GoogleUserPro from "./Pages/UserManagement/GoogleUserPro";
import MyLearningPlan from "./Pages/LearningPlan/MyLearningPlan";

// ✅ Updated component imports
import AddLearningProgress from "./Pages/LearningProgressManagement/AddLearningProgress";
import AllLearningProgress from "./Pages/LearningProgressManagement/AllLearningProgress";
import UpdateLearningProgress from "./Pages/LearningProgressManagement/UpdateLearningProgress";
import MyLearningProgress from "./Pages/LearningProgressManagement/MyLearningProgress";

import { ROUTES } from "./constants";

function ProtectedRoute({ children }) {
  const userID = localStorage.getItem("userID");
  if (!userID) {
    return <Navigate to={ROUTES.HOME} />;
  }
  return children;
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/oauth2/success") {
      const params = new URLSearchParams(window.location.search);
      const userID = params.get("userID");
      const name = params.get("name");
      const googleProfileImage = decodeURIComponent(
        params.get("googleProfileImage") || ""
      );

      if (userID && name) {
        localStorage.setItem("userID", userID);
        localStorage.setItem("userType", "google");
        if (googleProfileImage) {
          localStorage.setItem("googleProfileImage", googleProfileImage);
        }
        navigate(ROUTES.ALL_POSTS);
      } else {
        alert("Login failed. Missing user information.");
      }
    }
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<UserLogin />} />
      <Route path={ROUTES.REGISTER} element={<UserRegister />} />

      {/* Protected Routes - Learning Plan */}
      <Route
        path="/addLearningPlan"
        element={
          <ProtectedRoute>
            <AddLearningPlan />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.LEARNING_PLANS}
        element={
          <ProtectedRoute>
            <AllLearningPlan />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MY_LEARNING_PLANS}
        element={
          <ProtectedRoute>
            <MyLearningPlan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateLearningPlan/:id"
        element={
          <ProtectedRoute>
            <UpdateLearningPlan />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - User Management */}
      <Route
        path="/updateUserProfile/:id"
        element={
          <ProtectedRoute>
            <UpdateUserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/GoogleUserPro"
        element={
          <ProtectedRoute>
            <GoogleUserPro />
          </ProtectedRoute>
        }
      />

      {/* ✅ Protected Routes - Learning Progress */}
      <Route
        path="/addLearningProgress"
        element={
          <ProtectedRoute>
            <AddLearningProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/allLearningProgress"
        element={
          <ProtectedRoute>
            <AllLearningProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myLearningProgress"
        element={
          <ProtectedRoute>
            <MyLearningProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateLearningProgress/:id"
        element={
          <ProtectedRoute>
            <UpdateLearningProgress />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Notifications */}
      <Route
        path={ROUTES.NOTIFICATIONS}
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Posts */}
      <Route
        path={ROUTES.ADD_POST}
        element={
          <ProtectedRoute>
            <AddNewPost />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ALL_POSTS}
        element={
          <ProtectedRoute>
            <AllPost />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MY_POSTS}
        element={
          <ProtectedRoute>
            <MyAllPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updatePost/:id"
        element={
          <ProtectedRoute>
            <UpdatePost />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
