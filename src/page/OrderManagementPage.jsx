import { useEffect, useState } from "react";
import { Card, Input, Button, DatePicker } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import OrderTable from "../components/orderTable";
import { getAllOrders } from "../service/orderService";
import { SearchOutlined } from '@ant-design/icons';
import "../css/orderManagementPage.css"; // 导入自定义样式

const { RangePicker } = DatePicker;

/**
 * OrderManagementPage 组件用于展示用户的订单信息。
 * 使用 useEffect 钩子在组件加载时获取订单数据，并通过 OrderTable 组件显示。
 *
 * @returns {JSX.Element} 返回订单页面的布局。
 */
export default function OrderManagementPage() {
    const [orders, setOrders] = useState([]);//使用 useState 钩子管理订单数据状态
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);

    const initOrders = async (filters = {}) => {
        const fetchedOrders = await getAllOrders(filters); //
        console.log("Fetched orders:", fetchedOrders);

        // 对订单数据进行必要的格式化
        const formattedOrders = fetchedOrders.map(order => ({
            ...order,
            createdAt: new Date(order.time).toLocaleString(),
            items: order.orderItems// 确保 orderItems 在 orders 中
        }));

        setOrders(formattedOrders);
        console.log("Orders state after fetch:", formattedOrders);


    };

    useEffect(() => {
        initOrders();
    }, []); // 空数组依赖表示仅执行一次，相当于 componentDidMount

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    const handleSearch = () => {
        const filters = {
            keyword: searchTerm,
            startDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
        };
        initOrders(filters);
    };

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200 }} bordered={false}>
                <h1 className="order-title">All Orders</h1>
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
                <OrderTable orders={orders} />
            </Card>
        </PrivateLayout>
    );
}
