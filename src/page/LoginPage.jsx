// 导入 React 库
import React from "react";
// 导入 Ant Design 所需的图标和组件
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
// 导入登录服务和消息处理函数
import { login } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";

// 登录页面组件
const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage(); // 使用消息钩子来处理反馈信息
    const navigate = useNavigate(); // 使用导航钩子来处理路由跳转

    // 提交表单的事件处理函数
    const onSubmit = async (values) => {
        const { username, password } = values;

        const res = await login(username, password); // 调用登录服务
        handleBaseApiResponse(res, messageApi, () => navigate("/")); // 处理响应
    };

    return (
        <BasicLayout>
            {contextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: `url(${process.env.PUBLIC_URL + '/login.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: "'PT Serif', 'Helvetica', sans-serif" // 设置字体
            }}>
                <LoginForm
                    logo={process.env.PUBLIC_URL + '/logo512.png'}  // 网站LOGO
                    title="eBookStore"  // 网站名称
                    subTitle="电子书城"  // 网站副标题
                    onFinish={onSubmit}  // 表单提交事件绑定
                    formProps={{
                        layout: 'vertical',
                        size: 'large',
                        style: {
                            padding: '24px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            backgroundColor: '#fff',
                            width: '100%',
                            maxWidth: '400px'
                        }
                    }}
                >
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,  // 用户名输入框前缀图标
                        }}
                        placeholder={'Enter Username'}  // 输入框占位符
                        rules={[{ required: true, message: 'Enter Username!' }]}  // 输入验证规则
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,  // 密码输入框前缀图标
                        }}
                        placeholder={'Enter Password'}  // 输入框占位符
                        rules={[{ required: true, message: 'Enter Password!' }]}  // 输入验证规则
                    />

                    <div style={{ marginBlockEnd: 24, width: '100%', textAlign: 'center' }}>
                        <Link to='/register' style={{ marginRight: '10px' }}>New Account? Register </Link>
                        <a href="#/">     Forgot password? </a>
                    </div>
                </LoginForm>
            </div>
        </BasicLayout>
    );
};

// 导出 LoginPage 组件
export default LoginPage;
