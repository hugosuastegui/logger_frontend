import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import { Button, Form, Input } from "antd";
import MY_SERVICE from "../services";

const { getUserInfo, requestEmployer } = MY_SERVICE;

const Brief = () => {
  const [logs, setlogs] = useState(null);
  const { user } = useContext(MyContext);
  const [form] = Form.useForm();
  const [message, setmessage] = useState("");

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabLogs },
        },
      } = await getUserInfo();

      setlogs(collabLogs);
    }
    fetchInfo();
  }, []);

  const addEmployer = async (values) => {
    requestEmployer(values.employer);
    setmessage("Please wait to be validated");
  };

  return user ? (
    user.role === "employer" ? (
      <div>
        <img
          style={{ width: "5rem", borderRadius: "50%" }}
          src={user.photo}
          alt="UserPhoto"
        />
        <br />
        <br />
        <h2>{user.email}</h2>
        <br />
        <h3>Share this code with collabs</h3>
        <p>{user._id}</p>
        <br />
        <br />
      </div>
    ) : (
      <div>
        <img
          style={{ width: "5rem", borderRadius: "50%" }}
          src={user.photo}
          alt="UserPhoto"
        />
        <br />
        <br />
        <h2>{user.email}</h2>
        <br />
        {user.employer === undefined ? (
          <Form
            layout="vertical"
            name="basic"
            form={form}
            onFinish={addEmployer}
          >
            <Form.Item
              label="Add Employer"
              name="employer"
              rules={[{ required: true, message: "Enter Id" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <></>
        )}
        <p>{message}</p>
        <h3>Recent Logs</h3>
        <ul>
          {logs ? (
            logs.map((log, ind) => <li key={ind}>{log.location}</li>)
          ) : (
            <p>Loading</p>
          )}
        </ul>
      </div>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default Brief;
