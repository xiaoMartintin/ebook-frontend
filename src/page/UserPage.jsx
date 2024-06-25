import { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Avatar, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PrivateLayout } from '../components/privateLayout';
import { getMe } from '../service/userService';
import '../css/userPage.css';

export default function UserPage() {
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUser = async () => {
            const me = await getMe();
            setUser(me);
            form.setFieldsValue(me);
        };
        fetchUser();
    }, [form]);

    const handleFinish = (values) => {
        console.log('Updated values: ', values);
    };

    return (
        <PrivateLayout>
            <Card className="user-card" style={{ maxWidth: 800, margin: '20px auto' }}>
                <h1 className="user-title">My Profile</h1>
                {user && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                    >
                        <Form.Item name="nickname" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="level" label="User Level">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="contact" label="Contact">
                            <Input />
                        </Form.Item>
                        <Form.Item name="bio" label="Bio">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="avatar" label="Avatar">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                            >
                                <Avatar
                                    size={80}
                                    icon={user.avatar ? <img src={user.avatar} alt="avatar" /> : <UserOutlined />}
                                />
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                            <Button style={{ marginLeft: '10px' }}>Cancel</Button>
                        </Form.Item>
                    </Form>
                )}
            </Card>
        </PrivateLayout>
    );
}
