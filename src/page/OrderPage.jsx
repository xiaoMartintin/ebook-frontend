import { useEffect, useState } from "react";
import { Card, Input, Button } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/OrderTable";
import { getOrders } from "../service/order";
import { SearchOutlined } from '@ant-design/icons';
import "../css/OrderPage.css"; // 导入自定义样式

/**
 * OrderPage 组件用于展示用户的订单信息。
 * 使用 useEffect 钩子在组件加载时获取订单数据，并通过 OrderTable 组件显示。
 *
 * @returns {JSX.Element} 返回订单页面的布局。
 */
export default function OrderPage() {
    // 使用 useState 钩子管理订单数据状态
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 异步函数获取订单数据，并更新状态
    const initOrders = async () => {
        const fetchedOrders = await getOrders(); // 调用服务端API获取订单数据
        setOrders(fetchedOrders); // 将获取的订单数据设置到状态中
    };

    // 使用 useEffect 钩子在组件加载时初始化订单数据
    useEffect(() => {
        initOrders();
    }, []); // 空数组依赖表示仅执行一次，相当于 componentDidMount

    // 处理搜索输入变化
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 根据搜索词过滤订单项目
    const filteredOrders = orders.filter(order =>
        order.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 渲染组件
    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200, margin: "20px auto" }} bordered={false}>
                <h1 className="order-title">My Orders</h1>
                <Input.Search
                    placeholder="Enter Keyword"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    enterButton={<Button type="primary" icon={<SearchOutlined />} />}
                    style={{ marginBottom: '20px' }}
                />
                <OrderTable orders={filteredOrders} />
            </Card>
        </PrivateLayout>
    );
}
