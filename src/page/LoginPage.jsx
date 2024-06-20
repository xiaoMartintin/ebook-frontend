import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import { login } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";

const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        const res = await login(username, password);
        if (res.ok) {
            messageApi.success(res.message);
            navigate("/"); // 登录成功后重定向到主页或图书浏览页面
        } else {
            messageApi.error(res.message); // 登录失败时显示错误消息
        }
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
                fontFamily: "'PT Serif', 'Helvetica', sans-serif"
            }}>
                <LoginForm
                    logo={process.env.PUBLIC_URL + '/logo512.png'}
                    title="eBookStore"
                    subTitle="电子书城"
                    onFinish={onSubmit}
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
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'Enter Username'}
                        rules={[{ required: true, message: 'Enter Username!' }]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'Enter Password'}
                        rules={[{ required: true, message: 'Enter Password!' }]}
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

export default LoginPage;
