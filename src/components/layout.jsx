// 导入 Ant Design 的布局和空间组件，以及 React Router 和 React 的必要功能
import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../service/user";
import { UserContext } from "../lib/context";

// 定义基本布局组件
export function BasicLayout({ children }) {
    // 这个组件只提供一个基础的页面布局，包括头部、内容区域和页脚
    return (
        <Layout className="basic-layout">
            <Header className="header">
                <NavBar user={null} />
            </Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical" align="center">
                    <Link to="https://github.com/xiaoMartintin" target="_blank">关于作者</Link>
                    <div>电子书城 MARTIN 2024</div>
                </Space>
            </Footer>
        </Layout>
    );
}

// 定义私有布局组件，只允许登录用户访问
export function PrivateLayout({ children }) {
    const [user, setUser] = useState(null); // 用户状态
    const navigate = useNavigate(); // 导航功能用于重定向

    // 检查用户登录状态
    // 使用 useEffect 钩子在组件加载后检查登录状态
    useEffect(() => {
        // 定义 checkLogin 函数
        const checkLogin = async () => {
            const me = await getMe(); // 获取当前登录用户信息
            if (!me) {
                navigate("/login"); // 未登录则导航到登录页面
            } else {
                setUser(me); // 已登录则设置用户信息
            }
        };

        // 在 useEffect 的回调函数内调用 checkLogin
        checkLogin();

    }, [navigate]); // 空依赖数组，表示仅在组件挂载时执行一次


    // 私有布局结构，包括用户上下文提供者
    return (
        <Layout className="basic-layout">
            <Header className="header">
                <NavBar user={user} />
            </Header>
            <Content className="content">
                {/* 使用 UserContext.Provider 将 user 变量提供给所有子组件 */}
                <UserContext.Provider value={user}>
                    {user && children}
                </UserContext.Provider>
            </Content>
            <Footer className="footer">
                <Space direction="vertical" align="center">
                    <Link to="https://github.com/xiaoMartintin" target="_blank">关于作者</Link>
                    <div>电子书城 MARTIN 2024</div>
                </Space>
            </Footer>
        </Layout>
    );
}

