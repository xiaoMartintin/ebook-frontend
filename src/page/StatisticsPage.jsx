import { useEffect, useState } from "react";
import { Card, DatePicker, Button, Table, Pagination, Statistic } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { getStatistics } from "../service/statisticsService";
import { SearchOutlined, CrownOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';
import "../css/statisticsPage.css";

const { RangePicker } = DatePicker;

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState({books: [], totalBooks: 0, totalAmount: 0.0});
    const [dateRange, setDateRange] = useState([null, null]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        handleSearch();
    }, [currentPage, pageSize]);

    const handleDateChange = (dates) => {
        setDateRange(dates ? dates : [null, null]);
    };

    const handleSearch = async () => {
        const filters = {
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: currentPage - 1,
            pageSize: pageSize
        };
        const response = await getStatistics(filters);

        if (response && typeof response === 'object') {
            const { books = [], totalBooks = 0, totalAmount = 0.0, totalItems = 0 } = response;

            setStatistics({ books, totalBooks, totalAmount });
            setTotalItems(totalItems);
        } else {
            setStatistics({ books: [], totalBooks: 0, totalAmount: 0.0 });
            setTotalItems(0);
        }
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const columns = [
        {title: 'Book Title', dataIndex: 'title', key: 'title'},
        {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => `$${parseFloat(text).toFixed(2)}`
        }
    ];

    return (
        <PrivateLayout>
            <Card className="card-container" style={{maxWidth: 1200, margin: "20px", padding: "20px"}} bordered={false}>
                <h1 className="statistics-title">
                    <CrownOutlined style={{color: '#FFD700', marginRight: '10px'}}/>
                    My Purchase Statistics
                </h1>
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    className="ant-picker"
                    style={{marginBottom: '20px'}}
                />
                <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch} className="ant-btn-primary"
                        style={{width: '100%', marginBottom: '20px'}}>
                    Search
                </Button>
                <Table columns={columns} dataSource={statistics.books} rowKey="key" pagination={false}
                       className="table-container"/>
                <div className="pagination-controls">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['2', '8', '16', '24', '32', '40']}
                    />
                </div>
                <div className="statistics-summary">
                    <div className="statistics-total-books">
                        <Statistic title="Total Books" value={statistics.totalBooks} prefix={<BookOutlined/>}/>
                    </div>
                    <div className="statistics-total-amount">
                        <Statistic title="Total Amount" value={`${statistics.totalAmount.toFixed(2)}`}
                                   prefix={<DollarOutlined/>}/>
                    </div>
                </div>
            </Card>
        </PrivateLayout>
    );
}
