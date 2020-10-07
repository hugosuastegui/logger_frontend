import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import { Button, Form, Input, Card, Tag, Typography } from "antd";
import MY_SERVICE from "../services";
import Badge from "../components/Badge";
import EmployerStat from "../components/EmployerStat";
import CollabSummary from "../components/CollabSummary";

const { Title } = Typography;

const { getUserInfo, requestEmployer } = MY_SERVICE;

const validStyles = {
  color: "green",
};

const unvalidStyles = {
  color: "red",
};

const Brief = () => {
  const [logs, setlogs] = useState(null);
  const { user } = useContext(MyContext);
  const [form] = Form.useForm();
  const [message, setmessage] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [validatedCollabs, setValidatedCollabs] = useState([]);
  const [unvalidatedCollabs, setUnvalidatedCollabs] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabLogs },
        },
      } = await getUserInfo();

      const {
        data: {
          user: { collabs },
        },
      } = await getUserInfo();

      const unvalidated = collabs.filter((el) => !el.collabValidated);
      const validated = collabs.filter((el) => el.collabValidated);

      // ============== Employer Brief ================
      setCollaborators(collabs);
      setValidatedCollabs(validated);
      setUnvalidatedCollabs(unvalidated);
      // ============== Collab Brief ================
      setlogs(collabLogs);
    }
    fetchInfo();
  }, [logs]);

  const addEmployer = async (values) => {
    requestEmployer(values.employer);
    setmessage("Please wait to be validated");
  };

  function getTime(timestamp) {
    const date = new Date(timestamp);
    const day =
      date.getDay() === 0
        ? "Sun"
        : date.getDay() === 1
        ? "Mon"
        : date.getDay() === 2
        ? "Tue"
        : date.getDay() === 3
        ? "Wed"
        : date.getDay() === 4
        ? "Thu"
        : date.getDay() === 5
        ? "Fri"
        : date.getDay() === 6
        ? "Sat"
        : "";

    const hour = date.getHours();
    const min = date.getMinutes();
    return [day, hour, min];
  }

  collaborators.forEach((el) => {
    el.unvalidLogs = 0;
    for (let i = 0; i < el.collabLogs.length; ++i) {
      if (el.collabLogs[i].valid === false) el.unvalidLogs++;
    }

    el.validLogs = 0;
    for (let i = 0; i < el.collabLogs.length; ++i) {
      if (el.collabLogs[i].valid === true) el.validLogs++;
    }
  });

  return user ? (
    user.role === "employer" ? (
      <div>
        <Badge user={user}></Badge>
        <br />
        <Title level={4}>Share the following code with collabs</Title>
        <p>{user._id}</p>
        <br />
        <EmployerStat
          title="General"
          description="The number of collaborators signed to your code "
          success={`Accepted: ${validatedCollabs.length}`}
          secondary={`Pending: ${unvalidatedCollabs.length}`}
        ></EmployerStat>
        {validatedCollabs.map((collab, ind) => (
          <CollabSummary
            key={ind}
            photo={collab.photo}
            title={collab.name ? collab.name : collab.email}
            attendance={collab.validLogs}
            absence={collab.unvalidLogs}
          ></CollabSummary>
        ))}
      </div>
    ) : (
      <div>
        <Badge user={user}></Badge>
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
        <Title level={4}>Recent Logs</Title>
        {logs ? (
          <div>
            {logs.map((log, ind) => (
              <Card
                key={ind}
                title={log.poi ? log.poi.name : "Dropped PoI"}
                style={{ marginTop: 16 }}
              >
                <div style={{ marginBottom: 10 }}>
                  <Title level={5}>Check In by: {log.poi.checkinTime}</Title>
                  {log.poi.weekdays.map((tag, ind) => (
                    <span>
                      <Tag key={ind}>{tag}</Tag>
                    </span>
                  ))}
                </div>
                <div>
                  <Title level={5}>Log Info</Title>
                  <span>
                    Day: {getTime(log.createdAt)[0]}
                    {"  "}
                  </span>
                  <span>|</span>
                  <span>
                    Time: {getTime(log.createdAt)[1]}:
                    {getTime(log.createdAt)[2]}
                  </span>
                </div>
                <p>
                  Valid:{" "}
                  {log.valid === true ? (
                    <strong style={validStyles}>Validated</strong>
                  ) : (
                    <strong style={unvalidStyles}>Not Validated</strong>
                  )}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <h2>No logs to show</h2>
            <p>Make sure the scanned QRCodes are still valid</p>
          </div>
        )}
      </div>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default Brief;
