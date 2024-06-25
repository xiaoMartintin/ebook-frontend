import { useEffect, useState } from "react";
import { Card, DatePicker, Button, Table } from "antd";
import { PrivateLayout } from "../components/PrivateLayout";
import { getStatistics } from "../service/statistics";
import { SearchOutlined } from '@ant-design/icons';
import "../css/StatisticsPage.css";

const { RangePicker } = DatePicker;

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        // 默认加载时请求所有数据
        handleSearch();
    }, []);

    const handleDateChange = (dates) => {
        setDateRange(dates ? dates : [null, null]);
    };

    const handleSearch = async () => {
        const filters = {
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
        };
        const response = await getStatistics(filters);

        if (response && response.data) {
            const { data } = response;
            const fetchedStatistics = Object.keys(data)
                .filter(key => key !== 'totalBooks' && key !== 'totalAmount')
                .map(key => ({
                    ...data[key],
                    key: key
                }));
            setStatistics(fetchedStatistics);
        } else {
            setStatistics([]);
        }
    };

    const columns = [
        { title: 'Book Title', dataIndex: 'title', key: 'title' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Purchase Time', dataIndex: 'purchaseDate', key: 'purchaseDate', render: (text) => new Date(text).toLocaleString() },
    ];

    const totalBooks = statistics.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = statistics.reduce((acc, item) => acc + item.totalPrice, 0);

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200, margin: "20px auto" }} bordered={false}>
                <h1 className="statistics-title">My Purchase Statistics</h1>
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    style={{ marginBottom: '20px', width: '100%' }}
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} style={{ width: '100%', marginBottom: '20px' }}>
                    Search
                </Button>
                <Table columns={columns} dataSource={statistics} rowKey="key" pagination={false} />
                <div className="statistics-summary">
                    <p>Total Books: {totalBooks}</p>
                    <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>
            </Card>
        </PrivateLayout>
    );
}

//取消日期选择时，dateRange 变为 null
//在 handleDateChange 中添加对 null 值的处理。
// 将 dateRange 的默认值设置为 [null, null]。