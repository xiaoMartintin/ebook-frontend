// 导入所需组件和图标
import { Col, Menu, Row, Dropdown, Button } from "antd";
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
import ChangePasswordModal from "./change_password_modal";

// 导航栏组件
export default function NavBar({ user }) {
    // 使用 useState hook 初始化状态
    const [showModal, setShowModal] = useState(false); // 是否显示修改密码模态框
    const navigate = useNavigate(); // 获取导航函数
    const location = useLocation(); // 获取当前路径
    // 获取当前选中的导航项
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    // 导航项数组
    const navItems = [
        { label: "首页", value: "/" },
        { label: "购物车", value: "/cart" },
        { label: "订单", value: "/order" },
        { label: "排行", value: "/rank" },
        { label: "后端 API 文档", value: "/api-docs" }
    ];
    // 将导航项转换为菜单项
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));
    // 获取消息提示 API 和 contextHolder
    const [messageApi, contextHolder] = useMessage();

    // 打开修改密码模态框
    const handleOpenModal = () => {
        setShowModal(true);
    }

    // 关闭修改密码模态框
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // 处理菜单项点击事件
    const handleMenuClick = async (e) => {
        // 如果点击了登出菜单项
        if (e.key === "/logout") {
            // 调用登出服务方法
            let res = await logout();
            // 处理登出响应
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
        // 如果点击了修改密码菜单项
        if (e.key === "password") {
            // 打开修改密码模态框
            handleOpenModal();
            return;
        }
        // 如果点击了导航菜单项
        if (e.key.startsWith("/")) {
            // 导航到相应页面
            navigate(e.key);
        }
    };

    // 下拉菜单项数组
    const dropMenuItems = [
        {
            key: "nickname",
            label: user?.nickname,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance / 100}元`,
            icon: <AccountBookOutlined />,
        },
        { key: "/logout", label: "登出", icon: <LogoutOutlined />, danger: true },
    ];

    return (
        <Row className="navbar" justify="start">
            {contextHolder} {/* 显示消息提示 */}
            <Col>
                <Link to="/">Book Store</Link> {/* 导航到首页 */}
            </Col>
            <Col flex="auto">
                {/* 导航菜单 */}
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    items={navMenuItems}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {/* 如果有用户登录 */}
            {user && <Col>
                {/* 下拉菜单 */}
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    {/* 用户按钮 */}
                    <Button shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Col>}
            {/* 如果有用户登录且显示修改密码模态框 */}
            {user && showModal && <ChangePasswordModal onOk={handleCloseModal} onCancel={handleCloseModal} />}
        </Row>
    );
}
