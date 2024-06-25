import { Table, Tag, Space } from "antd";
import OrderItemList from "./orderItemList";
import { formatTime } from "../utils/time";

// 订单表格组件
export default function OrderTable({ orders }) {
    // 定义表格列配置
    const columns = [
        // 收货人列
        { title: 'Recipient', dataIndex: 'receiver', key: 'receiver', },
        // 联系方式列
        { title: 'Contact', dataIndex: 'tel', key: 'tel', },
        // 收货地址列
        { title: 'Address', dataIndex: 'address', key: 'address', },
        // 下单时间列
        {
            title: 'Order Time', dataIndex: 'time', key: 'time',
            // 格式化时间
            render: (time) => <Tag color="blue">{formatTime(time)}</Tag>
        },
        // 总价列
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice', },
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
                    <OrderItemList orderItems={order.orderItems} />
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            // 设置表格数据源
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
            // 设置表格样式
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
            style={{ fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}
        />
    );
}
