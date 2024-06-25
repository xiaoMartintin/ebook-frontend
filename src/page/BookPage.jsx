import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import BookProfile from "../components/BookProfile";
import { useEffect, useState } from "react";
import { getBookById, getBookComments } from "../service/book";
import { PrivateLayout } from "../components/PrivateLayout";
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';

/**
 * BookPage 组件用于展示书籍的详细信息和评论。
 * 使用路由参数获取书籍 ID，根据 ID 从服务端获取书籍数据和评论数据。
 */

export default function BookPage() {
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number.parseInt(searchParams.get("pageIndex") ?? '0');
    const pageSize = Number.parseInt(searchParams.get("pageSize") ?? '5');
    const sort = searchParams.get("sort") ?? "createdTime";

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchBook = async () => {
        const bookData = await getBookById(id);
        setBook(bookData);
    }

    const fetchComments = async () => {
        const commentsData = await getBookComments(id, pageIndex, pageSize, sort);
        setComments(commentsData);
    }

    useEffect(() => {
        fetchBook();
        fetchComments();
    }, [id]);

    useEffect(() => {
        fetchComments();
    }, [pageIndex, pageSize, sort]);

    const handleMutate = () => {
        fetchComments();
    };

    const handlePageChange = (page) => {
        setSearchParams({
            pageIndex: page - 1,
            pageSize,
            sort
        });
    };

    const handleSortChange = (newSort) => {
        setSearchParams({
            pageIndex: 0,
            pageSize,
            sort: newSort
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <PrivateLayout>
            <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/')}
                style={{
                    marginBottom: '1px',
                    marginTop: '20px',
                    marginLeft: '20px',
                    fontFamily: "'PT Serif', 'Helvetica', sans-serif",
                    backgroundColor: '#00A3D9',
                    borderColor: '#00A3D9',
                    color: '#fff',
                    borderRadius: '8px'
                }}
            >
                Back to Home
            </Button>

            {book && comments && (
                <BookProfile
                    pageIndex={pageIndex}
                    sort={sort}
                    book={book}
                    comments={comments}
                    onMutate={handleMutate}
                    onPageChange={handlePageChange}
                    onSortChange={handleSortChange}
                />
            )}
        </PrivateLayout>
    );
}
