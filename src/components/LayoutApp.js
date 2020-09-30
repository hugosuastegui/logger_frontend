import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import MY_SERVICE from "../services";
import { MyContext } from "../context.js";

const { logOut } = MY_SERVICE;
const { Sider, Header, Content, Footer } = Layout;

function LayoutApp({ children }) {
  const { clearCtxUser, user } = useContext(MyContext);
  const history = useHistory();

  const logoutProcess = async () => {
    await logOut();
    clearCtxUser(user);
    history.push("/login");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {user && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Brief</Link>
            </Menu.Item>
            {user.role === "collab" ? (
              <>
                <Menu.Item key="2" icon={<UploadOutlined />}>
                  <Link to="/scan">Scan QR</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  <Link to="/pois">PoIs</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                  <Link to="/collabs">Collabs</Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="5" icon={<VideoCameraOutlined />}>
              <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />} onClick={logoutProcess}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header>
          <div className="logo">
            <h2 style={{ color: "white" }}>LOGGER</h2>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by Hugo Suastegui
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
