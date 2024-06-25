import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/basicLayout";
import { loginService } from "../service/loginService";
import { handleBaseApiResponse } from "../utils/message";
import { UserContext } from "../lib/context";

const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const onSubmit = async (values) => {
        const { username, password } = values;
        const res = await loginService(username, password);
        handleBaseApiResponse(res, messageApi, () => {
            setUser(res.data);  // assuming res.data contains the user information
            localStorage.setItem('user', JSON.stringify(res.data));  // persist user info
            navigate("/");
        });
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
                        <Link to='/register' style={{ marginRight: '10px' }}>New Account? Register</Link>
                        {/* 忘记密码链接没写不好意思，你点了没用 */}
                        <a href="#/">Forgot password?</a>
                    </div>
                </LoginForm>
            </div>
        </BasicLayout>
    );
};

export default LoginPage;
