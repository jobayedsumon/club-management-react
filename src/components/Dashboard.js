import { Card, Layout } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { getAllMembers } from "../helpers/functions";
import { useDispatch } from "react-redux";
import { setMembers } from "../redux/member";

const Dashboard = () => {
  const dispatch = useDispatch();
  const membersList = useSelector((state) => state.member.membersList);
  useEffect(() => {
    getAllMembers().then((members) => dispatch(setMembers(members)));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <Card hoverable className="widgetCard">
        <div className="headerText">Total</div>
        <div className="number">{membersList?.length}</div>
        <div className="footerText">Members</div>
      </Card>
    </div>
  );
};

export default Dashboard;
