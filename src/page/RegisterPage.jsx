import React from "react";
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/BasicLayout";
import { register } from "../service/user";
import { handleBaseApiResponse } from "../utils/message";
import "../css/RegisterPage.css"; // 引入样式文件

const RegisterPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, nickname, password, confirmPassword, email } = values;

        if (password !== confirmPassword) {
            messageApi.error("Passwords do not match!");
            return;
        }

        const res = await register(username, nickname, password, email);

        if (res.ok) {
            messageApi.success("Registration success!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            messageApi.error(res.message || "Registration failed!");
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
                    submitter={{
                        searchConfig: {
                            submitText: 'Register',
                        },
                    }}
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
                        rules={[{ required: true, message: 'Please enter a username!' }]}
                    />
                    <ProFormText
                        name="nickname"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'Enter Nickname'}
                        rules={[{ required: true, message: 'Please enter a nickname!' }]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                            className: 'input-password',
                        }}
                        placeholder={'Enter Password'}
                        rules={[{ required: true, message: 'Please enter a password!' }]}
                    />
                    <ProFormText.Password
                        name="confirmPassword"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                            className: 'input-password',
                        }}
                        placeholder={'Confirm Password'}
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                    />
                    <ProFormText
                        name="email"
                        fieldProps={{
                            size: 'large',
                            prefix: <MailOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'Enter Email'}
                        rules={[
                            { required: true, message: 'Please enter an email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    />
                    <div style={{ marginBlockEnd: 24, width: '100%', textAlign: 'center' }}>
                        <Link to='/login' style={{ marginRight: '10px' }}>Already have an account? Login</Link>
                    </div>
                </LoginForm>
            </div>
        </BasicLayout>
    );
};

export default RegisterPage;
