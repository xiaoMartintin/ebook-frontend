import React, { useState, useEffect, useContext } from 'react';
import { Table, Switch, message, Card, Button, Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PrivateLayout } from '../components/privateLayout';
import { getAllUsers, changeUserStatus } from '../service/userService';
import { UserContext } from '../lib/context';
import '../css/userManagementPage.css';

const UserManagementPage = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user && user.is_admin === 1) {
            fetchUsers();
        } else {
            message.error('Access denied');
        }
    }, [user]);

    const fetchUsers = async (search = "") => {
        setLoading(true);
        try {
            const result = await getAllUsers(search);
            if (result.ok !== false) {
                setUsers(result); // 假设result直接是用户数据的数组
            } else {
                message.error('Failed to fetch users');
            }
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (userId, isEnabled) => {
        try {
            await changeUserStatus(userId, isEnabled);
            message.success('User status updated');
            fetchUsers(searchTerm);
        } catch (error) {
            message.error('Failed to update user status');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        fetchUsers(event.target.value);
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (isAdmin) => (isAdmin ? 'Admin' : 'Customer'),
        },
        {
            title: 'Status',
            dataIndex: 'is_enabled',
            key: 'is_enabled',
            render: (isEnabled, record) => (
                record.is_admin ? (
                    <Switch checked={isEnabled} disabled />
                ) : (
                    <Switch
                        checked={isEnabled}
                        onChange={() => handleToggleStatus(record.id, !isEnabled)}
                    />
                )
            ),
        },
    ];

    return (
        <PrivateLayout>
            <Card className="user-management-page">
                <h1 className="user-management-title">User Management</h1>
                <Row justify="space-between" style={{ marginBottom: '20px' }}>
                    <Input.Search
                        placeholder="Search by username or email"
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={handleSearch}
                        enterButton={
                            <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchUsers(searchTerm)} className="search-button">
                                Search
                            </Button>
                        }
                        style={{ width: '100%' }}
                    />
                </Row>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </PrivateLayout>
    );
};

export default UserManagementPage;
