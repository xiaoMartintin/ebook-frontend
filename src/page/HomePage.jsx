import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Space, Input, Carousel, Row, Col } from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/BookList";
import { searchBooks } from "../service/book";
import BookCard from "../components/BookCard"; // 导入BookCard组件
import "../css/HomePage.css";

// 使用解构赋值直接从 'antd' 的 Input 中提取 Search 组件
const { Search } = Input;

// 定义主页函数组件
export default function HomePage() {
    // 定义状态：books 存储书籍列表，totalPage 存储总页数
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    // 使用搜索参数钩子
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    // 异步函数获取书籍数据
    const getBooks = async () => {
        const pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        setBooks(pagedBooks.items);
        setTotalPage(pagedBooks.total);
    };

    // 使用 useEffect 钩子来监听依赖变化并触发书籍数据的获取
    useEffect(() => {
        getBooks();
    }, [keyword, pageIndex, pageSize]);

    // 处理搜索事件，重置页码和设置搜索关键词
    const handleSearch = keyword => {
        setSearchParams({ "keyword": keyword, "pageIndex": 0, "pageSize": 8 });
    };

    // 处理页面改变事件
    const handlePageChange = page => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    };

    // 返回组件 JSX
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
                            autoplaySpeed={1500} // 设置播放速率为1.5秒
                            dots={true} // 显示轮播点
                            className="book-carousel"
                        >
                            {books.slice(0, 5).map(book => (
                                <div key={book.id} className="carousel-item">
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <BookCard book={book} />
                                        </Col>
                                        <Col span={16}>
                                            <div className="book-info">
                                                <h2>{book.title}</h2>
                                                <p>{book.description}</p>
                                                <p><strong>Author:</strong> {book.author}</p>
                                                <p><strong>Price:</strong> {book.price / 100}元</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Carousel>
                    )}
                    <BookList
                        books={books}
                        pageSize={pageSize}
                        total={totalPage * pageSize}
                        current={pageIndex + 1}
                        onPageChange={handlePageChange}
                        className="book-list"
                    />
                </Space>
            </Card>
        </PrivateLayout>
    );
}
