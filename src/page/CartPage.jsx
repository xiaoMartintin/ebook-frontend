import { useEffect, useState } from "react";
import { getCartItems } from "../service/cartService";
import { Card, Input, Button, Select, Pagination } from "antd";
import CartItemTable from "../components/cartItemTable";
import { PrivateLayout } from "../components/privateLayout";
import { SearchOutlined } from '@ant-design/icons';
import "../css/cartPage.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [totalItems, setTotalItems] = useState(0);

    const initCartItems = async () => {
        const response = await getCartItems(searchTerm, pageIndex, pageSize);
        setCartItems(Array.isArray(response.items) ? response.items : []);
        setTotalItems(response.total || 0);
    };

    useEffect(() => {
        initCartItems();
    }, [searchTerm, pageIndex, pageSize]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPageIndex(0);
    };

    const handlePageChange = (page) => {
        setPageIndex(page - 1);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setPageIndex(0);
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
                    enterButton={
                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearchChange} className="search-button">
                            Search
                        </Button>
                    }
                    style={{ marginBottom: '20px' }}
                />
                <CartItemTable cartItems={filteredItems} onMutate={initCartItems} />
                <div className="pagination-controls">
                    <div className="pagination-center">
                        <Pagination
                            current={pageIndex + 1}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            onShowSizeChange={handlePageSizeChange}
                            total={totalItems}
                            showSizeChanger
                            pageSizeOptions={['2','8', '16', '24', '32', '40']}
                        />
                    </div>
                </div>
            </Card>
        </PrivateLayout>
    );
}
