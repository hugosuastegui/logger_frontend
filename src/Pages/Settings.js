import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Input } from "antd";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import MY_SERVICE from "../services/index";
import { useForm } from "antd/lib/form/Form";

const { getUserInfo, updateUser } = MY_SERVICE;

function Settings() {
  const { user } = useContext(MyContext);
  const [form] = Form.useForm();

  //   async function uploadPhoto({ target: { files } }) {
  //     const data = new FormData()
  //     data.append("file", files[0])
  //     data.append("upload_preset", "restaurants-app")

  //     const {
  //       data: { secure_url }
  //     } = await axios.post(
  //       "https://api.cloudinary.com/v1_1/joss/image/upload",
  //       data
  //     )
  //     setImageUrl(secure_url)
  //   }

  async function editUser(values) {
    console.log(values);
  }

  return user ? (
    <div>
      <h2>Settings</h2>
      <Form form={form} onFinish={() => editUser()}>
        <Form.Item label="Name" name="name">
          <Input placeholder={user.name} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder={user.email} />
        </Form.Item>
        {/* <input type="file" onChange={uploadPhoto} />
        <Button type="primary" htmlType="submit" disabled={!imageUrl}>
          Create restaurant
        </Button> */}
        <Form.Item label="Nickname" name="nickname">
          <Input placeholder={user.nickname} />
        </Form.Item>
      </Form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Settings;
