import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import BookPage from "./BookPage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import RankPage from "./RankingPage";
import ApiPage from "./ApiPage";

/**
 * AppRouter 组件用于配置应用程序的路由
 * 使用 react-router-dom 提供的 BrowserRouter、Route 和 Routes 组件进行路由配置
 */
export default function AppRouter() {
    return (
        <BrowserRouter>
            {/* 使用 Routes 组件包裹所有的 Route */}
            <Routes>
                {/* 配置首页路由，当访问根路径时展示 HomePage 组件 */}
                <Route index element={<HomePage />} />

                {/* 配置登录页面路由，当访问 "/login" 路径时展示 LoginPage 组件 */}
                <Route path="/login" element={<LoginPage />} />

                {/* 配置书籍页面路由，当访问 "/book/:id" 路径时展示 BookPage 组件 */}
                <Route path="/book/:id" element={<BookPage />} />

                {/* 配置购物车页面路由，当访问 "/cart" 路径时展示 CartPage 组件 */}
                <Route path="/cart" element={<CartPage />} />

                {/* 配置订单页面路由，当访问 "/order" 路径时展示 OrderPage 组件 */}
                <Route path="/order" element={<OrderPage />} />

                {/* 配置排行榜页面路由，当访问 "/rank" 路径时展示 RankPage 组件 */}
                <Route path="/rank" element={<RankPage />} />

                {/* 配置 API 文档页面路由，当访问 "/api-docs" 路径时展示 ApiPage 组件 */}
                <Route path="/api-docs" element={<ApiPage />} />

                {/* 配置默认路由，当访问任意未匹配的路径时展示 HomePage 组件 */}
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}