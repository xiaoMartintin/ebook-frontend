import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Card, Space, Input, Carousel, Row, Col, Image } from "antd";
import { PrivateLayout } from "../components/PrivateLayout";
import BookList from "../components/BookList";
import { searchBooks } from "../service/book";
import BookCard from "../components/BookCard";
import "../css/HomePage.css";

const { Search } = Input;

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    const getBooks = async () => {
        try {
            const pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
            setBooks(pagedBooks.items || []);
            setTotalPage(pagedBooks.total || 0);
        } catch (error) {
            console.error("Failed to fetch books:", error);
            setBooks([]);
            setTotalPage(0);
        }
    };

    useEffect(() => {
        getBooks();
    }, [keyword, pageIndex, pageSize]);

    const handleSearch = keyword => {
        setSearchParams({ "keyword": keyword, "pageIndex": 0, "pageSize": 8 });
    };

    const handlePageChange = page => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    };

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Search
                        placeholder="Enter Keyword"
                        onSearch={handleSearch}
                        enterButton
                        size="large"
                        className="search-input"
                        style={{ fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}
                    />
                    {books.length > 0 && (
                        <Carousel
                            autoplay
                            autoplaySpeed={1500}
                            dots={true}
                            className="book-carousel"
                        >
                            {books.slice(0, 5).map(book => (
                                <div key={book.id} className="carousel-item">
                                    <Row gutter={16} style={{ height: "100%" }}>
                                        <Col span={8}>
                                            <Image src={book.cover} />
                                        </Col>
                                        <Col span={16} style={{ display: "flex", alignItems: "stretch" }}>
                                            <Link to={`/book/${book.id}`} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                                                <div className="book-info">
                                                    <h2>{book.title}</h2>
                                                    <p className="description">{book.description}</p>
                                                    <p className="author"><span className="label">Author:</span> {book.author}</p>
                                                    <p className="price"><span className="label">Price:</span> ${book.price}</p>
                                                    <div className="details">
                                                        <p className="sales"><span className="label">Sales:</span> {book.sales}</p>
                                                        <p className="inventory"><span className="label">Inventory:</span> {book.inventory}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Carousel>
                    )}
                    <BookList
                        books={books}
                        pageSize={pageSize}
                        total={totalPage}
                        current={pageIndex + 1}
                        onPageChange={handlePageChange}
                        className="book-list"
                    />
                </Space>
            </Card>
        </PrivateLayout>
    );
}
