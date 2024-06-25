import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import BookPage from './BookPage';
import CartPage from './CartPage';
import OrderPage from './OrderPage';
import RankPage from './RankingPage';
import ApiPage from './ApiPage';
import RegisterPage from './RegisterPage';
import StatisticsPage from './StatisticsPage';
import UserPage from './UserPage';
import AdminDashboardPage from './AdminDashboardPage';
import BookManagementPage from './BookManagementPage';
import OrderManagementPage from './OrderManagementPage';
import UserManagementPage from './UserManagementPage';


import { useContext } from 'react';
import { UserContext } from '../lib/context';
import {BASEURL} from "../utils/common";
export default function AppRouter() {
    const user = useContext(UserContext);

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
                {user && user.is_admin === 1 ? (
                    <>
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/books" element={<BookManagementPage />} />
                        <Route path="/admin/orders" element={<OrderManagementPage />} />
                        <Route path="/admin/users" element={<UserManagementPage />} />
                        <Route path="/admin/user-management" element={<UserManagementPage />} /> // 添加用户管理页面路由
                    </>
                ) : (
                    <Route path="/*" element={<Navigate to="/" />} />
                )}
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}