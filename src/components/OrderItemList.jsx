import { List, Avatar, Space } from "antd";

// 订单商品列表组件
export default function OrderItemList({ orderItems }) {
    return (
        <List
            // 设置数据源为订单商品列表
            dataSource={orderItems}
            // 渲染每个订单商品项
            renderItem={(item, _) => (
                <List.Item>
                    <List.Item.Meta
                        // 商品封面
                        avatar={<Avatar shape="square" size={80} src={item.book.cover} />}
                        // 商品标题
                        title={<span style={{ fontWeight: 'bold' }}>{item.book.title}</span>}
                        // 商品数量
                        description={<Space><span style={{ color: 'grey' }}>Quantity:</span> <span>{item.quantity}</span></Space>}
                    />
                </List.Item>
            )}
            style={{ fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}
        />
    );
}
