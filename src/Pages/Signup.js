import React, { useContext } from "react";
import { Form, Input, Button, Select, Row, Divider } from "antd";
import MY_SERVICE from "../services";
import { MyContext } from "../context.js";
import { Link } from "react-router-dom";
const { signup, login } = MY_SERVICE;

let baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const { Option } = Select;

function Signup({ history }) {
  const [form] = Form.useForm();
  const { setCtxUser } = useContext(MyContext);

  async function signupProcess(values) {
    console.log(values);
    await signup(values);
    const {
      data: { user },
    } = await login(values);
    delete user.password;
    delete user.hash;
    delete user.salt;
    setCtxUser(user);
    history.push("/");
  }

  return (
    <div>
      <h2>Welcome!</h2>
      <h3>Please Sign Up</h3>
      <Form layout="vertical" name="basic" form={form} onFinish={signupProcess}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Repeat Password"
          name="repeatedPassword"
          rules={[{ required: true, message: "Repeat password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Select Role" }]}
        >
          <Select defaultValue="Employer">
            <Option value="true">Employer</Option>
            <Option value="false">Collaborator</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account?<Link to="/login"> Log In</Link>
      </p>
      <Divider>Or</Divider>
      <br />
      <Row>
        <Button danger type="primary" block>
          <a href={`${baseURL}/auth/google`}>Login with Google as a Collab</a>
        </Button>
      </Row>
    </div>
  );
}

export default Signup;
