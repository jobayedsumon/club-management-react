import React, { useEffect, useState } from "react";
import { Card, Row, Col, Avatar } from "antd";
import fetchWrapper from "../../helpers/fetchWrapper";
import { getImage } from "../../helpers/functions";
import "./ViewMember.css";
import { InboxOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";

const ViewMember = ({ id }) => {
  const [member, setmember] = useState({});
  useEffect(() => {
    if (id) {
      fetchWrapper
        .get("member/" + id)
        .then((response) => {
          setmember(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <Card hoverable bordered={true} className="mt-4">
      <Row>
        <Col span={10}>
          {member.image ? (
            <Avatar
              size={300}
              alt={member.lastname}
              src={getImage(member.image)}
            />
          ) : (
            <UserOutlined style={{ fontSize: "300px", textAlign: "center" }} />
          )}
        </Col>
        <Col span={10}>
          <div className="memberDataCard">
            <div className="memberName">
              {member.firstname + " " + member.lastname}
            </div>
            <hr />
            <div className="memberInfo">
              <InboxOutlined className="mr-2" />
              {member.email}
            </div>
            <div className="memberInfo">
              <PhoneOutlined className="mr-2" /> {member.phone}
            </div>
            <div className="memberInfo">
              {member.status == 1 ? "Active" : "Inactive"} Member
            </div>
            <div className="memberInfo">
              Joined {moment(member.createdAt).fromNow()}
            </div>
            <hr />
            <div className="memberAddress">{member.address}</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ViewMember;
