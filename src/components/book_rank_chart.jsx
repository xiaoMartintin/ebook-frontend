import { Column } from '@ant-design/plots';

/**
 * 书籍销量排行图表组件
 * @param {Array} books - 书籍列表
 */
export default function BookRankChart({ books }) {
    // 根据书籍列表生成图表所需的数据格式
    const data = books.map(book => ({
        sales: book.sales,
        title: book.title,
    }));

    // 配置图表的属性
    const config = {
        // 设置数据源
        data,
        // 设置 x 轴字段
        xField: 'title',
        // 设置 y 轴字段
        yField: 'sales',
        // 设置标签显示在柱形图顶部
        label: {
            position: 'top',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        // 设置 x 轴配置
        xAxis: {
            label: {
                // 自动隐藏标签
                autoHide: true,
                // 自动旋转标签
                autoRotate: true,
            },
        },
        // 设置数据字段的别名
        meta: {
            title: {
                alias: '书名',
            },
            sales: {
                alias: '销量',
            },
        },
    };

    // 返回柱形图组件并传入配置
    return <Column {...config} />;
}
