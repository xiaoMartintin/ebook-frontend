import { useParams, useSearchParams } from "react-router-dom";
import BookInfoCard from "../components/book_info_card";
import { useEffect, useState } from "react";
import { getBookById, getBookComments } from "../service/book";
import { PrivateLayout } from "../components/layout";

/**
 * BookPage 组件用于展示书籍的详细信息和评论。
 * 使用路由参数获取书籍 ID，根据 ID 从服务端获取书籍数据和评论数据。
 */
export default function BookPage() {
    // 使用状态钩子管理书籍和评论的数据
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState(null);

    // 使用搜索参数钩子管理和获取 URL 中的查询参数
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number.parseInt(searchParams.get("pageIndex") ?? '0');
    const pageSize = Number.parseInt(searchParams.get("pageSize") ?? '5');
    const sort = searchParams.get("sort") ?? "createdTime";

    // 获取 URL 参数中的书籍 ID
    const { id } = useParams();

    // 从服务端获取书籍信息
    const fetchBook = async () => {
        const bookData = await getBookById(id);
        setBook(bookData);
    }

    // 从服务端获取书籍的评论信息
    const fetchComments = async () => {
        const commentsData = await getBookComments(id, pageIndex, pageSize, sort);
        setComments(commentsData);
    }

    // 使用 useEffect 钩子在组件加载或依赖变化时调用数据获取函数
    useEffect(() => {
        fetchBook();
        fetchComments();
    }, [id]); // 依赖书籍 ID 变化

    useEffect(() => {
        fetchComments();
    }, [pageIndex, pageSize, sort]); // 依赖分页和排序参数变化

    // 处理评论数据变动的回调函数
    const handleMutate = () => {
        fetchComments();
    };

    // 处理页码变化的回调函数
    const handlePageChange = (page) => {
        setSearchParams({
            pageIndex: page - 1,
            pageSize,
            sort
        });
    };

    // 处理排序变化的回调函数
    const handleSortChange = (newSort) => {
        setSearchParams({
            pageIndex: 0, // 重置页码
            pageSize,
            sort: newSort
        });
    };

    // 渲染组件
    return (
        <PrivateLayout>
            {book && comments && (
                <BookInfoCard
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
