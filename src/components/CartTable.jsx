import { List, Space, Table, Image, Button, InputNumber, Row, Col } from "antd";
import { changeCartItemNumber, deleteCartItem } from "../service/cart";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceOrderModal from "./OrderModal";

/**
 * 创建购物车商品表格组件，接收 cartItems 和 onMutate 两个 props
 *
 * @param {Array} cartItems 购物车商品列表
 * @param {Function} onMutate 购物车数据变更时的回调函数
 * @returns {JSX.Element} 返回购物车商品表格组件
 */
export default function CartItemTable({ cartItems, onMutate }) {
    // 使用 useMessage hook 获取消息 API 和 contextHolder
    const [messageApi, contextHolder] = useMessage();
    // 使用 useState hook 初始化状态
    const [items, setItems] = useState(cartItems);
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // 处理删除商品事件
    const handleDeleteItem = async (id) => {
        // 调用删除商品的服务方法
        let res = await deleteCartItem(id);
        // 处理响应消息
        handleBaseApiResponse(res, messageApi, onMutate);
        if (res.ok) {
            // 如果删除成功，更新选中商品列表
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        }
    }

    // 当传入的购物车商品列表变化时更新本地状态
    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    // 打开下单模态框
    const handleOpenModal = () => {
        setShowModal(true);
    }

    // 关闭下单模态框
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // 计算选中商品的总价格
    const computeTotalPrice = () => {
        // 计算每个选中商品的价格，并累加
        const prices = selectedItems.map(item => item.book.price * item.number);
        // 返回总价，单位为元
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) : 0;
    }

    // 处理商品数量变化
    const handleNumberChange = async (id, number) => {
        // 调用改变商品数量的服务方法
        let res = await changeCartItemNumber(id, number);
        if (res.ok) {
            // 更新商品数量
            items.filter(item => item.id === id)[0].number = number;
            let selected = selectedItems.find(item => item.id === id);
            if (selected) {
                selected.number = number;
                setSelectedItems([...selectedItems]);
            }
            setItems([...items]);
        }
    }

    // 定义表格列
    const columns = [
        {
            // 表格列标题：封面
            title: 'Cover',
            // 数据索引：book
            dataIndex: 'book',
            // 列关键字：cover
            key: 'cover',
            // 渲染单元格内容为封面图像
            render: book => <Image src={book.cover} height={50} />
        },
        {
            // 表格列标题：书名
            title: 'Title',
            // 数据索引：book
            dataIndex: 'book',
            // 列关键字：book_title
            key: 'book_title',
            // 渲染单元格内容为书名，并添加链接到书籍详情页
            render: book => (<Link to={`/book/${book.id}`}>{book.title}</Link>),
        },
        {
            // 表格列标题：数量
            title: 'Amount',
            // 数据索引：number
            dataIndex: 'number',
            // 列关键字：number
            key: 'number',
            // 渲染单元格内容为输入框，可输入数量，最小为1
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.value} onChange={(newNumber) => {
                handleNumberChange(item.id, newNumber);
            }} />
        },
        {
            // 表格列标题：价格
            title: 'Price',
            // 数据索引：book
            dataIndex: 'book',
            // 列关键字：book_price
            key: 'book_price',
            // 渲染单元格内容为书籍价格，单位为元
            render: book => `${book.price}元`
        },
        {
            // 表格列标题：操作
            title: 'Action',
            // 不指定数据索引，因为数据索引为空
            dataIndex: '',
            // 列关键字：action
            key: 'action',
            // 渲染单元格内容为删除按钮，并绑定点击事件处理删除商品
            render: (item) => <Button type="primary" danger onClick={() => {
                handleDeleteItem(item.id);
            }}>Delete</Button>,
        },
    ];

    // 处理订单提交事件
    const handleOrderSubmit = () => {
        setShowModal(false);
        onMutate();
    }

    return <>
        {contextHolder}
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} selectedItems={selectedItems} onOk={handleOrderSubmit} />}
        {/* 购物车商品表格 */}
        <Table
            // 指定列配置
            columns={columns}
            // 表格行选择配置
            rowSelection={{
                // 选中项发生变化的回调
                onChange: (_, selectedItems) => {
                    setSelectedItems(selectedItems);
                },
            }}
            // 可展开配置
            expandable={{
                // 展开行内容渲染函数
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
            // 数据源为购物车商品列表
            dataSource={items.map(item => ({
                ...item,
                key: item.id
            }))}
        />
        {/* 显示总价 */}
        <p>Total: {computeTotalPrice()}元</p>
        {/* 下单按钮 */}
        <Button type="primary" disabled={selectedItems.length === 0}
                onClick={handleOpenModal}
        >Place Order</Button>
    </>
}
