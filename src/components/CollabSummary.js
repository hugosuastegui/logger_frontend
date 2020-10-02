import React from "react";
import { Avatar, Card, Space, Tag } from "antd";

const { Meta } = Card;

const cardStyle = {
  marginTop: 16,
};

function CollabSummary({ photo, title, attendance, absence }) {
  return (
    <Card style={cardStyle}>
      <Meta avatar={<Avatar src={photo} />} title={title} />
      <Space direction="horizontal">
        <Tag color="green">Attendce: {attendance}</Tag>
        <Tag color="red">Absences: {absence}</Tag>
      </Space>
    </Card>
  );
}

export default CollabSummary;
