import React, { useEffect, useState } from "react";
import { Card, DatePicker, Button, Table, Space, Tabs, Select, Pagination } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { getSalesStatistics, getUserPurchaseStatistics } from "../service/statisticsService";
import { SearchOutlined } from '@ant-design/icons';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../css/adminDashboardPage.css";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

export default function AdminDashboardPage() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [salesStats, setSalesStats] = useState([]);
    const [userStats, setUserStats] = useState([]);
    const [salesPageIndex, setSalesPageIndex] = useState(0);
    const [salesPageSize, setSalesPageSize] = useState(8);
    const [userPageIndex, setUserPageIndex] = useState(0);
    const [userPageSize, setUserPageSize] = useState(8);

    useEffect(() => {
        handleSearch();
    }, [salesPageIndex, salesPageSize, userPageIndex, userPageSize]);

    const handleDateChange = (dates) => {
        setDateRange(dates ? dates : [null, null]);
    };

    const handleSearch = async () => {
        const filters = {
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: salesPageIndex,
            pageSize: salesPageSize,
        };

        const userFilters = {
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: userPageIndex,
            pageSize: userPageSize,
        };

        const salesResponse = await getSalesStatistics(filters);
        const userResponse = await getUserPurchaseStatistics(userFilters);

        if (salesResponse && salesResponse.sales) {
            setSalesStats(salesResponse.sales);
        }

        if (userResponse && userResponse.users) {
            setUserStats(userResponse.users);
        }
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
                <h1 className="statistics-title">Sales and User Statistics</h1>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <RangePicker
                        value={dateRange}
                        onChange={handleDateChange}
                        className="ant-picker"
                        // style={{ marginBottom: '10px' }}
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="ant-btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
                        Search
                    </Button>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Sales Ranking" key="1">
                            <Table columns={salesColumns} dataSource={salesStats} rowKey="title" pagination={false} />
                            <div className="pagination-controls">
                                <div className="pagination-center">
                                    <Pagination
                                        current={salesPageIndex + 1}
                                        pageSize={salesPageSize}
                                        onChange={(page) => setSalesPageIndex(page - 1)}
                                        total={salesStats.length}
                                    />
                                </div>
                                <Select defaultValue={salesPageSize} style={{ width: 120 }} onChange={setSalesPageSize}>
                                    {[8, 16, 24, 32, 40].map(size => (
                                        <Option key={size} value={size}>{size} / page</Option>
                                    ))}
                                </Select>
                            </div>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={salesStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="title" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="quantity" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabPane>
                        <TabPane tab="User Purchase Ranking" key="2">
                            <Table columns={userColumns} dataSource={userStats} rowKey="username" pagination={false} />
                            <div className="pagination-controls">
                                <div className="pagination-center">
                                    <Pagination
                                        current={userPageIndex + 1}
                                        pageSize={userPageSize}
                                        onChange={(page) => setUserPageIndex(page - 1)}
                                        total={userStats.length}
                                    />
                                </div>
                                <Select defaultValue={userPageSize} style={{ width: 120 }} onChange={setUserPageSize}>
                                    {[8, 16, 24, 32, 40].map(size => (
                                        <Option key={size} value={size}>{size} / page</Option>
                                    ))}
                                </Select>
                            </div>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={userStats}>
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
