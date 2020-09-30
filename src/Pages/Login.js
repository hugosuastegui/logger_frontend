import React, { useContext } from "react";
import { Form, Input, Button, Divider, Row } from "antd";
import { Link, Redirect } from "react-router-dom";
import MY_SERVICE from "../services";
import { MyContext } from "../context.js";
const { login } = MY_SERVICE;

let baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

function Signup({ history }) {
  const [form] = Form.useForm();
  const { user, setCtxUser } = useContext(MyContext);

  async function loginProcess(values) {
    const {
      data: { user },
    } = await login(values);
    delete user.password;
    delete user.hash;
    delete user.salt;
    setCtxUser(user);
    history.push("/");
  }

  return !user ? (
    <div>
      <h2>Welcome!</h2>
      <h3>Please Log In</h3>
      <Form layout="vertical" name="basic" form={form} onFinish={loginProcess}>
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <Divider>Or</Divider>
      <br />
      <Row>
        <Button danger type="primary" block>
          <a href={`${baseURL}/auth/google`}>Login with Google as Collab</a>
        </Button>
      </Row>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Signup;
