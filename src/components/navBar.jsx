import { Menu, Layout, Avatar, Dropdown } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    OrderedListOutlined,
    BarChartOutlined,
    PieChartOutlined,
    DashboardOutlined,
    BookOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { logoutService } from "../service/logoutService";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useState, useContext, useEffect } from "react";
import ChangePasswordModal from "./changePasswordModal";
import { UserContext } from "../lib/context";
import '../css/navBar.css';

const { Sider } = Layout;

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const { user, setUser } = useContext(UserContext);

    const navItems = [
        { label: "HOME", value: "/", icon: <HomeOutlined /> },
        { label: "CART", value: "/cart", icon: <ShoppingCartOutlined /> },
        { label: "ORDER", value: "/order", icon: <OrderedListOutlined /> },
        { label: "RANKING", value: "/rank", icon: <BarChartOutlined /> },
        { label: "STATISTICS", value: "/statistics", icon: <PieChartOutlined /> }
    ];

    const adminNavItems = [
        { label: "HOME", value: "/", icon: <HomeOutlined /> },
        { label: "BOOKS", value: "/admin/books", icon: <BookOutlined /> },
        { label: "ORDERS", value: "/admin/orders", icon: <OrderedListOutlined /> },
        { label: "USERS", value: "/admin/users", icon: <UsergroupAddOutlined /> },
        { label: "DASHBOARD", value: "/admin/dashboard", icon: <DashboardOutlined /> }
    ];

    const navMenuItems = navItems.map(item => ({
        key: item.value,
        icon: item.icon,
        label: <Link to={item.value}>{item.label}</Link>
    }));

    const adminMenuItems = adminNavItems.map(item => ({
        key: item.value,
        icon: item.icon,
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
            let res = await logoutService();
            handleBaseApiResponse(res, messageApi, () => {
                setUser(null);
                localStorage.removeItem('user'); // Clear user data from localStorage on logout
                navigate("/login");
            });
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

    useEffect(() => {
        // This effect will re-run when the user state changes, ensuring the NavBar re-renders correctly.
    }, [user]);

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
                {!user && navMenuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} className="nav-button">
                        {item.label}
                    </Menu.Item>
                ))}
                {user && user.is_admin === 1 && adminMenuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} className="nav-button">
                        {item.label}
                    </Menu.Item>
                ))}
                {user && user.is_admin !== 1 && navMenuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} className="nav-button">
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
                        {`余额：${user.balance ? user.balance.toFixed(2) : 'N/A'}元`}
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
