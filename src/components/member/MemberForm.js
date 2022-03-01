import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Upload,
  Row,
  Col,
  Input,
  Card,
  Select,
  message,
  notification,
  Image,
  Avatar,
} from "antd";
import { UploadOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";
import fetchWrapper from "../../helpers/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../helpers/functions";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const fileUpload = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.file;
};

const MemberForm = ({ id }) => {
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    if (id) {
      fetchWrapper
        .put("member/" + id, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          if (response && response.message) {
            message.success(response.message);
            navigate("/members");
          }
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    } else {
      fetchWrapper
        .post("member", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          if (response && response.id) {
            message.success("Member Created Successfully!");
            navigate("/members");
          }
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    }
  };
  useEffect(() => {
    if (id) {
      fetchWrapper
        .get("member/" + id)
        .then((response) => {
          form.setFieldsValue(response);
          setimage(response.image);
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    }
  }, [id, image]);

  return (
    <div>
      <Card
        title={
          <h4 className="text-bold">
            {id ? "Update Member Data" : "Add Member"}
          </h4>
        }
      >
        {id && (
          <Row className="mb-3">
            <Col offset={9}>
              {image ? (
                <Avatar src={getImage(image)} size={200} />
              ) : (
                <UserOutlined style={{ fontSize: "100px" }} />
              )}
            </Col>
          </Row>
        )}

        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item label="First Name" name="firstname">
            <Input />
          </Form.Item>

          <Form.Item label="Last Name" name="lastname">
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="file"
            getValueFromEvent={fileUpload}
          >
            <Upload
              name="image"
              beforeUpload={() => {
                /* update state here */
                return false;
              }}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>
                Click to {id ? "change" : "upload"}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="status"
            label="Membership Status"
            rules={[
              { required: true, message: "Please select membership status!" },
            ]}
          >
            <Select>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              {id ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MemberForm;
