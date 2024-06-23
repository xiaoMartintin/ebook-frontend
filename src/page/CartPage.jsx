import { useEffect, useState } from "react";
import { getCartItems } from "../service/cart";
import { Card, Input, Button } from "antd";
import CartItemTable from "../components/CartTable";
import { PrivateLayout } from "../components/layout";
import { SearchOutlined } from '@ant-design/icons';
import "../css/CartPage.css";

/**
 * CartPage 组件，用于展示用户的购物车页面。
 * 在页面加载时调用 initCartItems 函数获取购物车中的商品，并显示在 CartItemTable 组件中。
 *
 * @returns {JSX.Element} 返回购物车页面的布局。
 */
export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const initCartItems = async () => {
        const fetchedCartItems = await getCartItems();
        setCartItems(fetchedCartItems); // 确保 cartItems 是一个数组
        console.log("Cart items state after fetch:", fetchedCartItems); // 打印更新后的状态
    };

    useEffect(() => {
        initCartItems();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = (cartItems || []).filter(item =>
        item.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PrivateLayout>
            <Card className="card-container" bordered={false}>
                <h1 className="cart-title">My Shopping Cart</h1>
                <Input.Search
                    placeholder="Enter Keyword"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    enterButton={<Button type="primary" icon={<SearchOutlined />} />}
                    style={{ marginBottom: '20px' }}
                />
                <CartItemTable cartItems={filteredItems} onMutate={initCartItems} />
            </Card>
        </PrivateLayout>
    );
}
