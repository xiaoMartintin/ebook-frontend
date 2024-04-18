import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/order_table";
import { getOrders } from "../service/order";

/**
 * OrderPage 组件用于展示用户的订单信息。
 * 使用 useEffect 钩子在组件加载时获取订单数据，并通过 OrderTable 组件显示。
 *
 * @returns {JSX.Element} 返回订单页面的布局。
 */
export default function OrderPage() {
    // 使用 useState 钩子管理订单数据状态
    const [orders, setOrders] = useState([]);

    // 异步函数获取订单数据，并更新状态
    const initOrders = async () => {
        const fetchedOrders = await getOrders(); // 调用服务端API获取订单数据
        setOrders(fetchedOrders); // 将获取的订单数据设置到状态中
    };

    // 使用 useEffect 钩子在组件加载时初始化订单数据
    useEffect(() => {
        initOrders();
    }, []); // 空数组依赖表示仅执行一次，相当于 componentDidMount

    // 渲染组件
    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200, margin: "20px auto" }}>
                {/* OrderTable 组件展示订单数据 */}
                <OrderTable orders={orders} />
            </Card>
        </PrivateLayout>
    );
}
