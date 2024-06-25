import React, { useState, useEffect } from 'react';
import { Table, Button, Switch, message } from 'antd';
import { getAllUsers, changeUserStatus } from '../service/userManagementService';
import '../css/userManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            setUsers(response.data);
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
            fetchUsers();
        } catch (error) {
            message.error('Failed to update user status');
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
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
                <Switch
                    checked={isEnabled}
                    onChange={() => handleToggleStatus(record.id, !isEnabled)}
                />
            ),
        },
    ];

    return (
        <div className="user-management-page">
            <h1>User Management</h1>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    );
};

export default UserManagementPage;
