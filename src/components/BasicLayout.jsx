// 导入 Ant Design 的布局和空间组件，以及 React Router 和 React 的必要功能
import { Layout, Space, Row, Col, Avatar } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../service/user";
import { UserContext } from "../lib/context";

// 定义基本布局组件
export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header">
                <Row align="middle">
                    <Col>
                        <Avatar src={process.env.PUBLIC_URL + '/logo512.png'} size="large" />
                    </Col>
                    <Col>
                        <h1 style={{ margin: 0, marginLeft: 10, color: '#00A3D9', fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}>
                            Martin's eBookStore
                        </h1>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <NavBar user={null} />
                <Content className="content">
                    {children}
                </Content>
            </Layout>
            <Footer className="footer">
                <Space direction="vertical" align="center">
                    <Link to="https://github.com/xiaoMartintin" target="_blank">关于作者</Link>
                    <div>电子书城 MARTIN 2024</div>
                </Space>
            </Footer>
        </Layout>
    );
}
