import React, { useContext, useEffect } from "react";
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

    // 定义一个格式化函数，将毫秒值转换为时分秒毫秒的格式
    const formatDuration = (duration) => {
        let milliseconds = parseInt(duration, 10); // 将字符串转换为整数
        let hours = Math.floor(milliseconds / (1000 * 60 * 60)); // 小时
        milliseconds = milliseconds % (1000 * 60 * 60); // 剩余毫秒数

        let minutes = Math.floor(milliseconds / (1000 * 60)); // 分钟
        milliseconds = milliseconds % (1000 * 60); // 剩余毫秒数

        let seconds = Math.floor(milliseconds / 1000); // 秒
        milliseconds = milliseconds % 1000; // 剩余毫秒数

        // 返回格式化后的字符串
        return `${hours}小时${minutes}分${seconds}秒${milliseconds}毫秒`;
    };

    // 检查并显示上次会话时长
    useEffect(() => {
        const sessionDuration = localStorage.getItem('sessionDuration');
        if (sessionDuration) {
            // 将 sessionDuration 格式化为时分秒毫秒，并在 message 中显示
            const formattedDuration = formatDuration(sessionDuration);
            messageApi.success(`您的上次会话时长为：${formattedDuration}`, 5); // 显示5秒钟的成功提示
            localStorage.removeItem('sessionDuration'); // 显示后清除本地存储中的数据
        }
    }, [messageApi]);

    const onSubmit = async (values) => {
        const { username, password } = values;
        const res = await loginService(username, password);
        handleBaseApiResponse(res, messageApi, () => {
            setUser(res); // 更新：使用 res 而不是 res.data
            localStorage.setItem('user', JSON.stringify(res)); // persist user info
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
                        <a href="#/">Forgot password?</a>
                    </div>
                </LoginForm>
            </div>
        </BasicLayout>
    );
};

export default LoginPage;
