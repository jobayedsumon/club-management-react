import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.userData);
  return <div>Dashboard {userData?.email}</div>;
};

export default Dashboard;
