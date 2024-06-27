import { useEffect, useState } from "react";
import { Card, Input, Button, DatePicker } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import OrderTable from "../components/orderTable";
import { getAllOrders } from "../service/orderService";
import { SearchOutlined } from '@ant-design/icons';
import "../css/orderManagementPage.css"; // 导入自定义样式

const { RangePicker } = DatePicker;

export default function OrderManagementPage() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const initOrders = async (filters = {}) => {
        const fetchedOrders = await getAllOrders(filters);
        const formattedOrders = fetchedOrders.map(order => ({
            ...order,
            createdAt: new Date(order.time).toLocaleString(),
            items: order.orderItems
        }));
        setOrders(formattedOrders);
        setTotalItems(fetchedOrders.length);
    };

    useEffect(() => {
        const filters = {
            keyword: searchTerm,
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: pageIndex - 1,
            pageSize: pageSize
        };
        initOrders(filters);
    }, [searchTerm, dateRange, pageIndex, pageSize]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    const handleSearch = () => {
        setPageIndex(1);
        const filters = {
            keyword: searchTerm,
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''
        };
        initOrders(filters);
    };

    const handlePageChange = (page, pageSize) => {
        setPageIndex(page);
        setPageSize(pageSize);
    };

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200 }} bordered={false}>
                <h1 className="order-title">Order Management</h1>
                <Input.Search
                    placeholder="Enter Keyword"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    enterButton={
                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="search-button">
                            Search
                        </Button>
                    }
                    style={{ marginBottom: '20px' }}
                />
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    style={{ marginBottom: '20px', width: '100%' }}
                />
                <OrderTable
                    orders={orders}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    currentPage={pageIndex}
                    onPageChange={handlePageChange}
                />
            </Card>
        </PrivateLayout>
    );
}
