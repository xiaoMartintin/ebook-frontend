import { List, Pagination, Space } from "antd";
import BookCard from "./book_card";

/**
 * 书籍列表组件
 * @param {Array} books - 书籍列表
 * @param {number} pageSize - 每页显示的书籍数量
 * @param {number} current - 当前页码
 * @param {number} total - 总共的书籍数量
 * @param {function} onPageChange - 页码改变时的回调函数
 */
export default function BookList({ books, pageSize, current, total, onPageChange }) {
    // 返回书籍列表和分页组件
    return (
        // 使用 Space 组件设置垂直方向的间距和居中对齐
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
            {/* 使用 List 组件渲染书籍列表 */}
            <List
                // 设置列表项之间的间距和列数
                grid={{
                    gutter: 16,
                    column: 5
                }}
                // 将书籍列表映射为带有 key 属性的新数组
                dataSource={books.map(book => ({
                    ...book,
                    key: book.id
                }))}
                // 渲染每个书籍列表项
                renderItem={(book, _) => (
                    <List.Item>
                        {/* 渲染书籍卡片组件 */}
                        <BookCard book={book} />
                    </List.Item>
                )}
            />
            {/* 使用 Pagination 组件渲染分页器 */}
            <Pagination
                // 设置当前页码
                current={current}
                // 设置每页显示的书籍数量
                pageSize={pageSize}
                // 设置页码改变时的回调函数
                onChange={onPageChange}
                // 设置总共的书籍数量
                total={total}
            />
        </Space>
    );
}
