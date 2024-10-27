import { List, Space, Table, Image, Button, InputNumber, Row, Col } from "antd";
import { changeCartItemQuantity, deleteCartItem } from "../service/cartService";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceOrderModal from "./orderModal";
import { message } from "antd";

/**
 * 创建购物车商品表格组件，接收 cartItems 和 onMutate 两个 props
 *
 * @param {Array} cartItems 购物车商品列表
 * @param {Function} onMutate 购物车数据变更时的回调函数
 * @returns {JSX.Element} 返回购物车商品表格组件
 */
export default function CartItemTable({ cartItems, onMutate }) {
    const [messageApi, contextHolder] = useMessage();
    const [items, setItems] = useState(cartItems);
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [orderUpdateMessage, setOrderUpdateMessage] = useState(""); // 新增状态，用于存储 WebSocket 消息

    const handleDeleteItem = async (id) => {
        let res = await deleteCartItem(id);
        handleBaseApiResponse(res, messageApi, onMutate);
        if (res.ok) {
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        }
    }

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    // 使用 useEffect 监听 WebSocket 消息变化
    useEffect(() => {
        if (orderUpdateMessage) {
            console.log("WebSocket Message Received:", orderUpdateMessage); // 调试输出
            message.info(orderUpdateMessage); // 弹出 WebSocket 消息
        }
    }, [orderUpdateMessage]);


    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => item.book.price * item.quantity);
        const total = prices.length > 0 ? prices.reduce((prev, cur) => prev + cur) : 0;
        return total.toFixed(2);
    }

    const handleQuantityChange = async (id, quantity) => {
        let res = await changeCartItemQuantity(id, quantity);
        if (res.ok) {
            const item = items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                let selected = selectedItems.find(item => item.id === id);
                if (selected) {
                    selected.quantity = quantity;
                    setSelectedItems([...selectedItems]);
                }
                setItems([...items]);
            }
        } else {
            messageApi.error('Not enough inventory');
        }
    }

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'book',
            key: 'cover',
            render: book => <Image src={book.cover} height={50} />
        },
        {
            title: 'Title',
            dataIndex: 'book',
            key: 'book_title',
            render: book => (<Link to={`/book/${book.id}`}>{book.title}</Link>),
        },
        {
            title: 'Amount',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, item) => <InputNumber min={1} defaultValue={quantity} value={item.value} onChange={(newQuantity) => {
                handleQuantityChange(item.id, newQuantity);
            }} />
        },
        {
            title: 'Price',
            dataIndex: 'book',
            key: 'book_price',
            render: book => `${book.price}元`
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (item) => <Button type="primary" danger onClick={() => {
                handleDeleteItem(item.id);
            }}>Delete</Button>,
        },
    ];

    const handleOrderSubmit = () => {
        setShowModal(false);
        onMutate();
    }

    return <>
        {contextHolder}
        {showModal && (
            <PlaceOrderModal
                onCancel={handleCloseModal}
                selectedItems={selectedItems}
                onOk={handleOrderSubmit}
                onOrderUpdate={setOrderUpdateMessage} // 将 WebSocket 消息传递到 CartItemTable
            />
        )}
        <Table
            columns={columns}
            rowSelection={{
                onChange: (_, selectedItems) => {
                    setSelectedItems(selectedItems);
                },
            }}
            expandable={{
                expandedRowRender: (cartItem) => (
                    <Row justify={"space-between"} gutter={8}>
                        <Col span={4}>
                            <Image src={cartItem.book.cover} height={200} />
                        </Col>
                        <Col span={20}>
                            <p>{cartItem.book.description}</p>
                        </Col>
                    </Row>
                ),
            }}
            dataSource={items.map(item => ({
                ...item,
                key: item.id
            }))}
            pagination={false} // 禁用 Table 组件自带的分页
        />
        <p style={{fontSize: 20, fontWeight: "bold", textAlign: "left", margin: 20}}>Total: {computeTotalPrice()}元</p>
        <Button type="primary" disabled={selectedItems.length === 0} onClick={handleOpenModal}>
            Place Order
        </Button>
    </>
}
