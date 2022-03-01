import {
  Button,
  Card,
  Image,
  Layout,
  message,
  Table,
  Modal,
  Avatar,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers } from "../../redux/member";
import fetchWrapper from "../../helpers/fetchWrapper";
import { getImage } from "../../helpers/functions";
import {
  EditOutlined,
  EyeOutlined,
  UserOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons/lib/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ViewMember from "./ViewMember";
import { useState } from "react";
import { getAllMembers } from "../../helpers/functions";

const MembersList = () => {
  const navigate = useNavigate();
  const [viewId, setviewId] = useState(null);
  const columns = [
    {
      title: "S/N",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      render: (text, record, index) =>
        record.image ? (
          <Avatar size={50} src={getImage(record.image)} />
        ) : (
          <UserOutlined style={{ fontSize: "32px" }} />
        ),
    },
    {
      title: "Name",
      render: (text, record, index) => record.firstname + " " + record.lastname,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Membership",
      render: (text, record, index) => (record.status ? "Active" : "Inactive"),
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Created",
      render: (text, record, index) =>
        moment(record.createdAtn).format("DD-MM-YYYY"),
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    },
    {
      title: "Action",
      align: "center",
      render: (text, record, index) => (
        <div className="d-flex justify-content-between">
          <Button type="primary" className="d-flex align-items-center">
            <EyeOutlined onClick={() => setviewId(record.id)} />
          </Button>
          <Button className="bg-success text-white d-flex align-items-center">
            <EditOutlined onClick={() => navigate("/member/" + record.id)} />
          </Button>
          <Button
            type="danger"
            className="d-flex align-items-center"
            onClick={() => deleteMember(record.id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.membersList);

  const deleteMember = (id) => {
    Modal.confirm({
      title: "Are you sure to remove this member?",
      icon: <ExclamationCircleOutlined />,
      content: "He will be removed from your club permanently!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetchWrapper
          .delete("member/" + id)
          .then((response) => {
            message.success(response.message);
            getAllMembers().then((members) => dispatch(setMembers(members)));
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };

  useEffect(() => {
    getAllMembers().then((members) => dispatch(setMembers(members)));
  }, []);

  console.log(viewId);

  return (
    <div>
      <Modal
        centered
        visible={viewId != null}
        onCancel={() => setviewId(null)}
        width={1000}
        footer={null}
      >
        <ViewMember id={viewId} />
      </Modal>

      <Card title={<h4>Members List</h4>}>
        <Table bordered striped columns={columns} dataSource={members} />
      </Card>
    </div>
  );
};

export default MembersList;
