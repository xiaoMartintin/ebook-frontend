import { Card, Divider, Pagination, Space, Tabs } from "antd";
import { addCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import BookDetails from "./book_details";
import BookCommentList from "./book_comment_list";
import CommentInput from "./comment_input";
import { addBookComment } from "../service/book";

/**
 * 书籍信息卡片组件，包含书籍详情、评论列表和添加评论功能。
 *
 * @param {object} props 组件属性
 * @param {number} props.pageIndex 当前页码
 * @param {string} props.sort 当前评论排序方式
 * @param {object} props.book 书籍对象
 * @param {object} props.comments 评论数据对象
 * @param {Function} props.onMutate 评论变更回调函数
 * @param {Function} props.onPageChange 页码改变回调函数
 * @param {Function} props.onSortChange 排序方式改变回调函数
 * @returns {JSX.Element} 书籍信息卡片
 */
export default function BookInfoCard({
                                         pageIndex, sort, book, comments, onMutate, onPageChange, onSortChange
                                     }) {
    const [messageApi, contextHolder] = useMessage();

    // 处理添加书籍到购物车事件
    const handleAddCartItem = async () => {
        let res = await addCartItem(book.id);
        handleBaseApiResponse(res, messageApi);
    };

    // 处理添加书籍评论事件
    const handleAddComment = async (comment) => {
        let res = await addBookComment(book.id, comment);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    // 评论排序选项
    const tabItems = [{
        'key': 'createdTime',
        'label': '最新评论'
    }, {
        'key': 'like',
        'label': '最热评论'
    }];

    return (
        <Card className="card-container">
            {contextHolder}
            <Space direction="vertical">
                {/* 书籍详情组件 */}
                <BookDetails book={book} onAddCartItem={handleAddCartItem} />
                <div style={{ margin: 20 }}>
                    <Divider>书籍评论</Divider>
                    {/* 评论排序选项卡 */}
                    <Tabs
                        items={tabItems}
                        defaultActiveKey={sort}
                        onChange={sort => { onSortChange(sort) }}
                    />
                    {/* 添加评论输入框 */}
                    <CommentInput placeholder="发布一条友善的评论" onSubmit={handleAddComment} />
                    {/* 书籍评论列表 */}
                    <BookCommentList comments={comments.items} onMutate={onMutate} />
                </div>
                {/* 分页器 */}
                <Pagination
                    current={pageIndex + 1}
                    pageSize={5}
                    total={5 * comments.total}
                    onChange={onPageChange}
                />
            </Space>
        </Card>
    );
}
