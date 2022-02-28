import React, { useState } from "react";
import { Image, Layout, Menu, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  EmailOutlined,
  MailFilled,
  MailOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./SideBar.css";
import Logo from "../../logo.jpg";
import { logout } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Image src={Logo} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/member/create">Add Member</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/members">Members List</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background d-flex justify-content-between align-items-center"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <div className="text-muted d-flex align-items-center">
                    <UserOutlined />{" "}
                    <span className="ml-2">{userData?.username}</span>
                  </div>
                  <div className="text-muted d-flex align-items-center">
                    <MailOutlined />{" "}
                    <span className="ml-2"> {userData?.email}</span>
                  </div>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item key="2">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout());
                    }}
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none" }}
                  >
                    <LogoutOutlined /> <span className="ml-2">Signout</span>
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined style={{ fontSize: "24px" }} className="pr-4" />
            </a>
          </Dropdown>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
