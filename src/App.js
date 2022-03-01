import { Layout } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/login/Login";
import AddMember from "./components/member/AddMember";
import EditMember from "./components/member/EditMember";
import MembersList from "./components/member/MembersList";
import SideBar from "./components/sidebar/SideBar";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.userData);
  const isAuthenticated = token && userData;
  return isAuthenticated ? (
    <Layout>
      <SideBar>{children}</SideBar>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/member/:id"
          element={
            <ProtectedRoute>
              <EditMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/create"
          exact
          element={
            <ProtectedRoute>
              <AddMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          exact
          element={
            <ProtectedRoute>
              <MembersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
