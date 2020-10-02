import React from "react";
import { Card, Typography, Space, Tag } from "antd";

const { Title, Text } = Typography;

const statStyle = {
  backgroundColor: "white",
  padding: "8px",
  borderRadius: "5px",
  border: "5px solid lightgrey",
  marginTop: "16px",
};

function EmployerStat({ title, description, success, secondary }) {
  return (
    <div style={statStyle}>
      <Title level={4}>{title}</Title>
      <Text>{description}</Text>
      <div>
        <Space direction="horizontal">
          <Tag color="green">{success}</Tag>
          <Tag color="blue">{secondary}</Tag>
        </Space>
      </div>
    </div>
  );
}

export default EmployerStat;
