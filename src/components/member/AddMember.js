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
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import fetchWrapper from "../../helpers/fetchWrapper";
import { useNavigate } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const fileUpload = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.file;
};

const AddMember = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
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
  };

  return (
    <Card title={<h4 className="text-bold">Add Member</h4>}>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
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
            <Button icon={<UploadOutlined />}>Click to upload</Button>
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
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddMember;
