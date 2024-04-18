// 导入Ant Design的Card组件以及React Router的Link组件
import { Card } from "antd";
import { Link } from "react-router-dom";

// 解构Card组件中的Meta组件，用于显示书籍的标题和描述信息
const { Meta } = Card;

/**
 * BookCard组件用于展示单个书籍的简要信息。
 * 这个组件接收一个书籍对象作为属性，显示书籍的封面、标题和价格，并提供点击跳转到书籍详情页的功能。
 *
 * @param {object} book 书籍对象，包含id、标题、封面图像和价格
 * @returns React组件，渲染一个链接包裹的书籍卡片
 */
export default function BookCard({ book }) {
    // 使用Link组件包裹Card组件，实现点击卡片跳转到书籍详情页面的功能
    // to属性定义了跳转的目标路径，使用模板字符串动态生成路径
    return (
        <Link to={`/book/${book.id}`}>
            <Card
                hoverable // 卡片悬浮效果
                cover={<img alt={book.title} src={book.cover} />} // 卡片封面，使用书籍的封面图像
            >
                <Meta
                    title={book.title} // 显示书籍的标题
                    description={`${book.price / 100}元`} // 显示书籍的价格，并将价格单位从分转换为元
                />
            </Card>
        </Link>
    );
}
