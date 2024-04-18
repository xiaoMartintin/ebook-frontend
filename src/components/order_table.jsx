// 导入 Table 组件和订单商品列表组件
import { Table } from "antd";
import OrderItemList from "./order_item_list";
// 导入时间格式化函数
import { formatTime } from "../utils/time";

// 订单表格组件
export default function OrderTable({ orders }) {
    // 定义表格列配置
    const columns = [
        // 收货人列
        { title: '收货人', dataIndex: 'receiver', key: 'receiver', },
        // 联系方式列
        { title: '联系方式', dataIndex: 'tel', key: 'tel', },
        // 收货地址列
        { title: '收货地址', dataIndex: 'address', key: 'address', },
        // 下单时间列
        {
            title: '下单时间', dataIndex: 'createdAt', key: 'createdAt',
            // 格式化时间
            render: (time) => formatTime(time)
        },
    ];

    return (
        <Table
            // 设置表格列配置
            columns={columns}
            // 设置可展开行配置
            expandable={{
                // 渲染展开内容
                expandedRowRender: (order) => (
                    // 调用订单商品列表组件，并传入订单商品项
                    <OrderItemList orderItems={order.items} />
                ),
            }}
            // 设置表格数据源
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
        />
    );
}
