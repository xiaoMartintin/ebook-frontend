import { useEffect, useState } from "react";
import { getCartItems } from "../service/cart";
import { Card } from "antd";
import CartItemTable from "../components/cart_item_table";
import { PrivateLayout } from "../components/layout";

/**
 * CartPage 组件，用于展示用户的购物车页面。
 * 在页面加载时调用 initCartItems 函数获取购物车中的商品，并显示在 CartItemTable 组件中。
 *
 * @returns {JSX.Element} 返回购物车页面的布局。
 */
export default function CartPage() {
    // 使用 useState 钩子管理购物车商品的状态
    const [cartItems, setCartItems] = useState([]);

    // 定义初始化购物车商品的异步函数
    const initCartItems = async () => {
        const items = await getCartItems(); // 从服务端获取购物车数据
        setCartItems(items); // 更新状态
    };

    // 使用 useEffect 钩子在组件挂载后调用 initCartItems 获取数据
    useEffect(() => {
        initCartItems();
    }, []); // 空依赖数组表示仅在组件挂载时执行一次

    // 渲染组件
    return (
        <PrivateLayout>
            <Card className="card-container" bordered={false}>
                {/* 传递购物车商品数据和数据变更处理函数给 CartItemTable 组件 */}
                <CartItemTable cartItems={cartItems} onMutate={initCartItems} />
            </Card>
        </PrivateLayout>
    );
}
