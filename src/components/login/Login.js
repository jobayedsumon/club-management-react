import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import "./Login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
import { useNavigate } from "react-router-dom";
import fetchWrapper from "../../helpers/fetchWrapper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    fetchWrapper
      .post("auth/signin", values)
      .then((response) => {
        if (response.token && response.userData) {
          message.success("Logged in Successfully!").then(() => {
            dispatch(login(response));
            navigate("/");
          });
        } else {
          message.error("Login Error!");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  return (
    <div className="LoginForm">
      <div className="FormBox">
        <h4 className="title">CLUB MANAGEMENT</h4>
        <Form name="login_form" onFinish={onFinish} autoComplete="Off">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 12,
            }}
          >
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
