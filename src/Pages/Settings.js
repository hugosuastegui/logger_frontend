import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Input } from "antd";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import MY_SERVICE from "../services/index";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";

import Badge from "../components/Badge";

const { getUserInfo, updateUser } = MY_SERVICE;

function Settings({ history }) {
  const { user } = useContext(MyContext);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  async function editUser(values) {
    console.log(values);
    const newValues = { ...values, photo: imageUrl };
    await updateUser(user._id, newValues);
    history.push("/");
  }

  async function uploadPhoto({ target: { files } }) {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "logger_image_upload");

    const {
      data: { secure_url },
    } = await axios.post(
      "https://api.cloudinary.com/v1_1/dcmffygzd/image/upload",
      data
    );
    setImageUrl(secure_url);
  }

  return user ? (
    <div>
      <Badge user={user}></Badge>
      <br />
      <h2>Settings</h2>
      <Form form={form} onFinish={editUser}>
        <Form.Item label="Name" name="name">
          <Input placeholder={user.name} />
        </Form.Item>
        <input type="file" onChange={uploadPhoto} />
        <br />
        <Button type="primary" htmlType="submit" disabled={!imageUrl}>
          Complete Profile
        </Button>
      </Form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Settings;
