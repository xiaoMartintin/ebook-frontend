import { Menu, Layout, Avatar, Dropdown, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined
} from '@ant-design/icons';
import { logout } from "../service/logout";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import '../css/NavBar.css';

const { Sider } = Layout;

export default function NavBar({ user }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];

    const navItems = [
        { label: "HOME", value: "/" },
        { label: "CART", value: "/cart" },
        { label: "ORDER", value: "/order" },
        { label: "RANKING", value: "/rank" },
        { label: "STATISTICS", value: "/statistics" }
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

    const dropMenuItems = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="/logout" icon={<LogoutOutlined />} danger>
                LOG OUT
            </Menu.Item>
        </Menu>
    );

    return (
        <Sider className="navbar-sider" width={200} theme="light">
            {contextHolder}
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
                    <Menu.Item key="nickname" onClick={() => navigate('/profile')}>
                        <UserOutlined />
                        {user.nickname}
                    </Menu.Item>
                    <Menu.Item key="password" onClick={handleOpenModal}>
                        <FormOutlined />
                        CHANGE PASSWORD
                    </Menu.Item>
                    <Menu.Item key="balance" disabled>
                        <AccountBookOutlined />
                        余额：{user.balance.toFixed(2)}元
                    </Menu.Item>
                    <Dropdown overlay={dropMenuItems} trigger={['click']}>
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
