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

export default function AppRouter() {
    const { user } = useContext(UserContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/book/:id" element={user ? <BookPage /> : <Navigate to="/login" />} />
                <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
                <Route path="/order" element={user ? <OrderPage /> : <Navigate to="/login" />} />
                <Route path="/rank" element={user ? <RankPage /> : <Navigate to="/login" />} />
                <Route path="/statistics" element={user ? <StatisticsPage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <UserPage /> : <Navigate to="/login" />} />
                {user && user.is_admin === 1 ? (
                    <>
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/books" element={<BookManagementPage />} />
                        <Route path="/admin/orders" element={<OrderManagementPage />} />
                        <Route path="/admin/users" element={<UserManagementPage />} />
                    </>
                ) : (
                    user && (
                        <Route path="*" element={<Navigate to="/" />} />
                    )
                )}
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}
