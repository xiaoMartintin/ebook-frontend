import { Table, Tag, Space } from "antd";
import OrderItemList from "./orderItemList";
import { formatTime } from "../utils/time";

export default function OrderTable({ orders, totalItems, pageSize, currentPage, onPageChange }) {
    const columns = [
        { title: 'Recipient', dataIndex: 'receiver', key: 'receiver' },
        { title: 'Contact', dataIndex: 'tel', key: 'tel' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Order Time', dataIndex: 'time', key: 'time',
            render: (time) => <Tag color="blue">{formatTime(time)}</Tag>
        },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
    ];

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (order) => (
                    <OrderItemList orderItems={order.orderItems} />
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
            pagination={{
                position: ['bottomCenter'],
                pageSize: pageSize,
                current: currentPage,
                total: totalItems,
                onChange: onPageChange,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50']
            }}
            style={{ fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}
        />
    );
}
