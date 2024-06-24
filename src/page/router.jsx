import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import BookPage from "./BookPage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import RankPage from "./RankingPage";
import ApiPage from "./ApiPage";
import RegisterPage from "./RegisterPage";
import StatisticsPage from "./StatisticsPage";
import UserPage from "./UserPage"; // 导入用户主页组件

/**
 * AppRouter 组件用于配置应用程序的路由
 * 使用 react-router-dom 提供的 BrowserRouter、Route 和 Routes 组件进行路由配置
 */
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/rank" element={<RankPage />} />
                <Route path="/api-docs" element={<ApiPage />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
