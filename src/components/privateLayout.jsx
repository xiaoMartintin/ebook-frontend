import { Layout, Space, Row, Col, Avatar } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMe } from "../service/userService";
import { UserContext } from "../lib/context";

export function PrivateLayout({ children }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            const me = await getMe();
            if (!me) {
                setUser(null);
                navigate("/login");
            } else {
                setUser(me);
            }
        };
        checkLogin();
    }, [navigate, setUser]);

    const renderHeader = () => {
        if (user?.is_admin === 1) {
            return (
                <h1 style={{ margin: 0, marginLeft: 10, color: '#00A3D9', fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}>
                    Martin's eBookStore - Admin
                </h1>
            );
        }
        return (
            <h1 style={{ margin: 0, marginLeft: 10, color: '#00A3D9', fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}>
                Martin's eBookStore
            </h1>
        );
    };

    if (!user) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Layout className="basic-layout">
                <Header className="header">
                    <Row align="middle">
                        <Col>
                            <Avatar src={process.env.PUBLIC_URL + '/logo512.png'} size="large" />
                        </Col>
                        <Col>
                            {renderHeader()}
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <NavBar />
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
        </UserContext.Provider>
    );
}
