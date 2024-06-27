import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Card, Space, Input, Button, Select, Table, Form, Modal, message, Pagination, Upload } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import { searchBooks, addBook, updateBook, deleteBook } from "../service/bookService";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
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
    const [coverBase64, setCoverBase64] = useState(null);

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
        setCoverBase64(null);
        setIsModalVisible(true);
    };

    const showEditBookModal = (book) => {
        setCurrentBook({ ...book });
        setCoverBase64(null);
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
            if (coverBase64) {
                values.cover = coverBase64; // 将base64字符串赋值给cover
            }
            console.log("Submitting values:", values); // 添加日志检查提交的数据格式
            await saveBook(values);
        } catch (error) {
            message.error('Failed to save book');
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleBeforeUpload = async (file) => {
        const base64 = await getBase64(file);
        setCoverBase64(base64);
        // console.log("Base64 Cover:", base64); // 检查 base64 编码的封面
        return false; // 防止自动上传
    };

    const saveBook = async (values) => {
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
            <Card className="card-container" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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
                    <Form.Item name="cover" label="Cover" rules={[{ required: true, message: 'Please upload the cover!' }]}>
                        <Upload
                            listType="picture"
                            maxCount={1}
                            accept="image/*"
                            beforeUpload={handleBeforeUpload}  // 使用 handleBeforeUpload 函数处理文件上传前的操作
                        >
                            <Button icon={<UploadOutlined />}>Upload Cover</Button>
                        </Upload>
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

//我们将文件上传处理移动到了 beforeUpload 中，
// 这样可以确保在文件选择后立即读取文件并将其转换为 Base64 格式。这也确保了文件在上传前已经被正确处理，避免了状态未更新的问题。

//在 showEditBookModal 函数中，使用 setCurrentBook({ ...book }) 确保 currentBook 正确更新。
// 在 Form 组件中添加 key={currentBook ? currentBook.id : 'new'} 属性，确保 Form 在 currentBook 变化时重新渲染。
// handleOk 函数异步读取文件的 base64 编码后，直接在 FileReader 的 onload 回调中调用 saveBook，而没有等待编码完成。
// 我们需要确保在文件被成功转换为 base64 编码后，再进行保存操作。
