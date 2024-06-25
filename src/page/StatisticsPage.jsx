import { useEffect, useState } from "react";
import { Card, DatePicker, Button, Table, Row, Col, Statistic } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { getStatistics } from "../service/statisticsService";
import { SearchOutlined } from '@ant-design/icons';
import "../css/statisticsPage.css";

const { RangePicker } = DatePicker;

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState({ books: [], totalBooks: 0, totalAmount: 0.0 });
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

        console.log("Response:", response); // 添加日志帮助调试

        if (response && typeof response === 'object') {
            const { bookQuantities = {}, bookTotalPrices = {}, totalBooks = 0, totalAmount = 0.0 } = response;

            const fetchedStatistics = Object.keys(bookQuantities).map(key => ({
                title: key,
                quantity: bookQuantities[key],
                totalPrice: bookTotalPrices[key],
                key: key
            }));

            console.log("Fetched Statistics:", fetchedStatistics); // 添加日志帮助调试

            setStatistics({ books: fetchedStatistics, totalBooks, totalAmount });
        } else {
            setStatistics({ books: [], totalBooks: 0, totalAmount: 0.0 });
        }
    };

    const columns = [
        { title: 'Book Title', dataIndex: 'title', key: 'title' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' }
    ];

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200, margin: "20px", padding: "20px" }} bordered={false}>
                <h1 className="statistics-title">My Purchase Statistics</h1>
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    className="ant-picker"
                    style={{ marginBottom: '20px' }}
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="ant-btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
                    Search
                </Button>
                <Table columns={columns} dataSource={statistics.books} rowKey="key" pagination={false} className="table-container" />
                <div className="statistics-summary">
                    <div className="statistics-total-books">
                        <Statistic title="Total Books" value={statistics.totalBooks} />
                    </div>
                    <div className="statistics-total-amount">
                        <Statistic title="Total Amount" value={`$${statistics.totalAmount.toFixed(2)}`} />
                    </div>
                </div>
            </Card>
        </PrivateLayout>
    );
}
