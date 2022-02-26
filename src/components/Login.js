import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import "./Login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
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
