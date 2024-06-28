import { useEffect, useState } from "react";
import { Card, Input, Button, DatePicker } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import OrderTable from "../components/orderTable";
import { getOrders } from "../service/orderService";
import { SearchOutlined } from '@ant-design/icons';
import "../css/orderPage.css";

const { RangePicker } = DatePicker;

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const initOrders = async (filters = {}) => {
        const response = await getOrders(filters);
        // console.log("response: ", response);
        if (response) {
            const fetchedOrders = response.content || [];
            // console.log("fetchedOrders: ", fetchedOrders);
            // 使用 map 方法遍历 fetchedOrders 数组，并将每个订单对象 order 映射为新的对象
            const formattedOrders = fetchedOrders.map(order => ({
                ...order,//展开运算符，将 order 对象的所有属性展开到新对象中。这是一个浅拷贝操作。
                createdAt: new Date(order.time).toLocaleString(),//为新对象添加一个 createdAt 属性。
                items: order.orderItems//items: order.orderItems：为新对象添加一个 items 属性，其值为 order.orderItems。
            }));
            setOrders(formattedOrders);
            setTotalItems(response.totalElements || fetchedOrders.length); // Use totalElements for pagination
        } else {
            setOrders([]);
            setTotalItems(0);
        }
    };

    useEffect(() => {
        const filters = {
            keyword: searchTerm,
            startDate: dateRange && dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: pageIndex - 1,
            //在后端分页系统中，通常页码是从 0 开始计数的，而在前端的 UI 中，页码通常是从 1 开始计数的。为了协调这一差异，我们需要在将页码传递给后端之前将其减 1。
            // 前端显示：用户看到的页码是 1，2，3，...
            // 后端请求：相应的页码应转换为 0，1，2，...
            pageSize: pageSize
        };
        initOrders(filters);
    }, [searchTerm, dateRange, pageIndex, pageSize]);

    const handleSearchChange = (e) => {
        //e：事件对象。对于输入框的 onChange 事件，事件对象包含了触发事件的输入框的相关信息。
        // e.target.value：获取输入框当前的值。target 属性是指向触发事件的 DOM 元素（在这种情况下是输入框），value 属性是输入框的当前值。
        setSearchTerm(e.target.value);
    };

    const handleDateChange = (dates) => {
        //dates：日期选择器的值。对于 RangePicker 的 onChange 事件，dates 是一个包含两个日期对象的数组，分别表示选择的开始日期和结束日期。
        setDateRange(dates || [null, null]);
    };

    const handleSearch = () => {
        setPageIndex(1);
        const filters = {
            keyword: searchTerm,
            startDate: dateRange && dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
            endDate: dateRange && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
            pageIndex: 0,
            pageSize: pageSize
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
                <h1 className="order-title">My Orders</h1>
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
