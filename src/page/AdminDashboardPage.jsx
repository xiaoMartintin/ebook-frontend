import React, { useEffect, useState } from "react";
import { Card, DatePicker, Button, Table, Space, Tabs, Pagination } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { getSalesStatistics, getUserPurchaseStatistics } from "../service/statisticsService";
import { SearchOutlined, CrownOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../css/adminDashboardPage.css";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default function AdminDashboardPage() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [salesStats, setSalesStats] = useState([]);
    const [userStats, setUserStats] = useState([]);
    const [salesPageIndex, setSalesPageIndex] = useState(1);
    const [salesPageSize, setSalesPageSize] = useState(10);
    const [userPageIndex, setUserPageIndex] = useState(1);
    const [userPageSize, setUserPageSize] = useState(10);

    useEffect(() => {
        handleSearch();
    }, [salesPageIndex, salesPageSize, userPageIndex, userPageSize]);

    const handleDateChange = (dates) => {
        setDateRange(dates ? dates : [null, null]);
    };

    const handleSearch = async () => {
        const filters = {
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''
        };

        const salesResponse = await getSalesStatistics(filters);
        const userResponse = await getUserPurchaseStatistics(filters);

        if (salesResponse && salesResponse.sales) {
            setSalesStats(salesResponse.sales);
        }

        if (userResponse && userResponse.users) {
            setUserStats(userResponse.users);
        }
    };

    const handleSalesPageChange = (page, pageSize) => {
        setSalesPageIndex(page);
        setSalesPageSize(pageSize);
    };

    const handleUserPageChange = (page, pageSize) => {
        setUserPageIndex(page);
        setUserPageSize(pageSize);
    };

    const getPaginatedData = (data, pageIndex, pageSize) => {
        const startIndex = (pageIndex - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    const salesColumns = [
        { title: 'Book Title', dataIndex: 'title', key: 'title' },
        { title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity' },
    ];

    const userColumns = [
        { title: 'User Name', dataIndex: 'username', key: 'username' },
        { title: 'Total Purchases', dataIndex: 'totalPurchases', key: 'totalPurchases', render: (value) => `$${value.toFixed(2)}` },
    ];

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200, margin: "20px", padding: "20px" }} bordered={false}>
                <h1 className="statistics-title">
                    <CrownOutlined style={{ color: '#FFD700', marginRight: '10px' }} />
                    Sales and User Statistics
                </h1>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <RangePicker
                        value={dateRange}
                        onChange={handleDateChange}
                        className="ant-picker"
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="ant-btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
                        Search
                    </Button>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><BarChartOutlined /> Sales Ranking</span>} key="1">
                            <Table columns={salesColumns} dataSource={getPaginatedData(salesStats, salesPageIndex, salesPageSize)} rowKey="title" pagination={false} />
                            <Pagination
                                current={salesPageIndex}
                                pageSize={salesPageSize}
                                total={salesStats.length}
                                onChange={handleSalesPageChange}
                                showSizeChanger
                                showQuickJumper
                                pageSizeOptions={['10', '20', '30', '40']}
                            />
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={getPaginatedData(salesStats, salesPageIndex, salesPageSize)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="title" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="quantity" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabPane>
                        <TabPane tab={<span><UserOutlined /> User Purchase Ranking</span>} key="2">
                            <Table columns={userColumns} dataSource={getPaginatedData(userStats, userPageIndex, userPageSize)} rowKey="username" pagination={false} />
                            <Pagination
                                current={userPageIndex}
                                pageSize={userPageSize}
                                total={userStats.length}
                                onChange={handleUserPageChange}
                                showSizeChanger
                                showQuickJumper
                                pageSizeOptions={['10', '20', '30', '40']}
                            />
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={getPaginatedData(userStats, userPageIndex, userPageSize)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="username" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalPurchases" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabPane>
                    </Tabs>
                </Space>
            </Card>
        </PrivateLayout>
    );
}
