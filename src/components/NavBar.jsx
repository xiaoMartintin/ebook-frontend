// 导入所需组件和图标
import { Menu, Layout, Avatar, Dropdown, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined
} from '@ant-design/icons';
// 导入登出服务方法和消息提示 hook
import { logout } from "../service/logout";
import useMessage from "antd/es/message/useMessage";
// 导入处理基本 API 响应的方法和 useState hook
import { handleBaseApiResponse } from "../utils/message";
import { useState } from "react";
// 导入修改密码模态框组件
import ChangePasswordModal from "./ChangePasswordModal";
import '../css/NavBar.css'; // 导入自定义样式

const { Sider } = Layout;

// 导航栏组件
export default function NavBar({ user }) {
    const [showModal, setShowModal] = useState(false); // 是否显示修改密码模态框
    const navigate = useNavigate(); // 获取导航函数
    const location = useLocation(); // 获取当前路径
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];

    const navItems = [
        { label: "HOME", value: "/" },
        { label: "CART", value: "/cart" },
        { label: "ORDER", value: "/order" },
        { label: "RANKING", value: "/rank" },
        { label: "API DOCS", value: "/api-docs" }
    ];

    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));

    const [messageApi, contextHolder] = useMessage();

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleMenuClick = async (e) => {
        if (e.key === "/logout") {
            let res = await logout();
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
        if (e.key === "password") {
            handleOpenModal();
            return;
        }
        if (e.key.startsWith("/")) {
            navigate(e.key);
        }
    };

    const dropMenuItems = [
        { key: "/logout", label: "LOG OUT", icon: <LogoutOutlined />, danger: true }
    ];

    return (
        <Sider className="navbar-sider" width={200} theme="light">
            {contextHolder} {/* 显示消息提示 */}
            <Menu
                mode="vertical"
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                className="navbar-menu"
                onClick={handleMenuClick}
            >
                {navMenuItems.map(item => (
                    <Menu.Item key={item.key} className="nav-button">
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
            {user && (
                <Menu mode="vertical" className="user-menu">
                    <Menu.Item key="nickname" disabled>
                        <UserOutlined />
                        {user.nickname}
                    </Menu.Item>
                    <Menu.Item key="password" onClick={handleOpenModal}>
                        <FormOutlined />
                        CHANGE PASSWORD
                    </Menu.Item>
                    <Menu.Item key="balance" disabled>
                        <AccountBookOutlined />
                        余额：{user.balance / 100}元
                    </Menu.Item>
                    <Dropdown menu={{ items: dropMenuItems }} trigger={['click']}>
                        <Menu.Item key="more" className="dropdown-menu">
                            ...
                        </Menu.Item>
                    </Dropdown>
                </Menu>
            )}
            {user && showModal && <ChangePasswordModal onOk={handleCloseModal} onCancel={handleCloseModal} />}
        </Sider>
    );
}
