import { useState, useEffect } from "react";
import { Card, Input, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { PrivateLayout } from "../components/privateLayout";
import { getBookAuthorByName } from "../service/microService";
import "../css/microServicePage.css";

export default function MicroServicePage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    // 初始化书籍搜索
    const initBookSearch = async () => {
        const allBooks = await getBookAuthorByName(searchTerm);
        setBooks(Array.isArray(allBooks) ? allBooks : []); // 如果 allBooks 不是数组，则设为空数组
        setTotalItems(Array.isArray(allBooks) ? allBooks.length : 0);
    };


    // 当搜索条件或分页条件变化时，更新显示的书籍
    useEffect(() => {
        initBookSearch();
    }, [searchTerm]);

    // 处理搜索输入的更改
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 执行搜索
    const handleSearch = () => {
        setPageIndex(1); // 重置分页为第一页
        initBookSearch();
    };

    // 处理分页更改
    const handlePageChange = (page, pageSize) => {
        setPageIndex(page);
        setPageSize(pageSize);
    };

    // 设置表格的列
    const columns = [
        { title: "书名", dataIndex: "title", key: "title" },
        { title: "作者", dataIndex: "author", key: "author" },
    ];

    // 截取显示的书籍数据以实现前端分页
    const paginatedBooks = books.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    return (
        <PrivateLayout>
            <Card className="card-container" style={{ maxWidth: 1200 }} bordered={false}>
                <h1 className="microservice-title">MICROSERVICE</h1>
                <Input.Search
                    placeholder="输入书名关键字"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    enterButton={
                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="search-button">
                            Search
                        </Button>
                    }
                    style={{ marginBottom: "20px" }}
                />
                <Table
                    columns={columns}
                    dataSource={paginatedBooks.map((book, index) => ({ ...book, key: index }))}
                    pagination={{
                        current: pageIndex,
                        pageSize: pageSize,
                        total: totalItems,
                        onChange: handlePageChange,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        position: ["bottomCenter"],
                    }}
                    style={{ fontFamily: "'PT Serif', 'Helvetica', sans-serif" }}
                />
            </Card>
        </PrivateLayout>
    );
}
