import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Card, Space, Input, Button, Select, Table, Form, Modal, message, Pagination } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { searchBooks, addBook, updateBook, deleteBook } from "../service/bookService";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import "../css/bookManagementPage.css";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

export default function BookManagementPage() {
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

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
        setSearchParams({ "keyword": keyword, "pageIndex": 0, "pageSize": pageSize });
    };

    const handlePageChange = page => {
        setSearchParams({ "keyword": keyword, "pageIndex": page - 1, "pageSize": pageSize });
    };

    const handlePageSizeChange = value => {
        setSearchParams({ "keyword": keyword, "pageIndex": 0, "pageSize": value });
    };

    const showAddBookModal = () => {
        setCurrentBook(null);
        setIsModalVisible(true);
    };

    const showEditBookModal = (book) => {
        setCurrentBook({ ...book });
        setIsModalVisible(true);
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want to delete this book?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            onOk() {
                handleDeleteBook(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            message.success('Book deleted successfully');
            getBooks();
        } catch (error) {
            message.error('Failed to delete book');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async (values) => {
        try {
            if (currentBook) {
                await updateBook(currentBook.id, values);
                message.success('Book updated successfully');
            } else {
                await addBook(values);
                message.success('Book added successfully');
            }
            getBooks();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to save book');
        }
    };

    const columns = [
        { title: 'Cover', dataIndex: 'cover', key: 'cover', width: 100, render: (text) => <img src={text} alt="cover" style={{ width: '50px', height: '50px' }} /> },
        { title: 'Title', dataIndex: 'title', key: 'title', width: 200, render: (text, record) => <Link to={`/book/${record.id}`}>{text}</Link> },
        { title: 'Author', dataIndex: 'author', key: 'author', width: 150 },
        { title: 'ISBN', dataIndex: 'isbn', key: 'isbn', width: 150 },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (text) => `$${parseFloat(text).toFixed(2)}`
        },
        { title: 'Inventory', dataIndex: 'inventory', key: 'inventory', width: 100 },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showEditBookModal(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <PrivateLayout>
            <Card className="card-container" style={{borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                <h1 className="book-management-title">Book Management</h1>
                <div className="search-add-container">
                    <Input.Search
                        placeholder="Enter Keyword"
                        onSearch={handleSearch}
                        enterButton={
                            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="search-button">
                                Search
                            </Button>
                        }
                        style={{ width: 'calc(100% - 130px)', marginRight: '10px' }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddBookModal} className="add-book-button">
                        Add Book
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={books}
                    pagination={false}
                    rowKey="id"
                />
                <div className="pagination-controls">
                    <div className="pagination-center">
                        <Pagination
                            current={pageIndex + 1}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            total={totalPage}
                        />
                    </div>
                    <Select defaultValue={pageSize} style={{ width: 120 }} onChange={handlePageSizeChange}>
                        {[8, 16, 24, 32, 40].map(size => (
                            <Option key={size} value={size}>{size} / page</Option>
                        ))}
                    </Select>
                </div>
            </Card>
            <Modal
                title={<><BookOutlined /> {currentBook ? "Edit Book" : "Add Book"}</>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                titleStyle={{ color: '#00A3D9', fontSize: '20px' }}
            >
                <Form
                    initialValues={currentBook || { cover: '', title: '', author: '', isbn: '', price: '', inventory: 0, description: '' }}
                    onFinish={handleOk}
                    key={currentBook ? currentBook.id : 'new'}
                >
                    <Form.Item name="cover" label="Cover" rules={[{ required: true, message: 'Please input the cover URL!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please input the author!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="isbn" label="ISBN" rules={[{ required: true, message: 'Please input the ISBN!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="inventory" label="Inventory" rules={[{ required: true, message: 'Please input the inventory!' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            {currentBook ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </PrivateLayout>
    );
}
//在 showEditBookModal 函数中，使用 setCurrentBook({ ...book }) 确保 currentBook 正确更新。
// 在 Form 组件中添加 key={currentBook ? currentBook.id : 'new'} 属性，确保 Form 在 currentBook 变化时重新渲染。