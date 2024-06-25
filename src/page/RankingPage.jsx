import { Card } from "antd";
import { PrivateLayout } from "../components/privateLayout";
import BookRankChart from "../components/rankingChart";
import { useEffect, useState } from "react";
import { getTop10BestSellingBooks } from "../service/bookService";

/**
 * RankPage 组件展示图书销售排行榜。
 * 该组件在组件挂载时从后端获取销售排行前10的图书数据，并通过 BookRankChart 组件展示这些数据。
 * 使用 PrivateLayout 作为页面布局，保证这部分内容只对授权用户显示。
 *
 * @returns {JSX.Element} 返回排行榜页面的布局。
 */
export default function RankPage() {
    // 使用 useState 钩子管理图书排行榜的状态
    const [books, setBooks] = useState([]);

    // 异步函数从服务端获取销量前10的图书数据
    const fetchTop10Books = async () => {
        const fetchedBooks = await getTop10BestSellingBooks(); // 请求数据
        setBooks(fetchedBooks); // 更新状态
    };

    // 使用 useEffect 钩子在组件加载时请求图书数据
    useEffect(() => {
        fetchTop10Books();
    }, []); // 空数组作为依赖，确保仅在组件首次挂载时执行

    // 渲染组件
    return (
        <PrivateLayout>
            <Card className="card-container" style={{maxWidth: 1200, margin: "auto", padding: "20px"}}>
                {/* 传递图书数据到 BookRankChart 组件以展示图书排行榜 */}
                <BookRankChart books={books}/>
            </Card>
        </PrivateLayout>
    );
}
