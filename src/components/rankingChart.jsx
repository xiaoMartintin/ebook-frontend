import { Column, Line } from '@ant-design/plots';
import { Card } from 'antd';
import React from 'react';

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

    // 配置柱形图的属性
    const columnConfig = {
        // 设置数据源
        data,
        // 设置 x 轴字段
        xField: 'title',
        // 设置 y 轴字段
        yField: 'sales',
        // 设置标签显示在柱形图外部顶部
        label: {
            position: 'top',
            style: {
                fill: '#595959',
                opacity: 0.8,
                fontSize: 14,
                fontWeight: 'bold',
            },
        },
        // 设置 x 轴配置
        xAxis: {
            label: {
                // 自动隐藏标签
                autoHide: true,
                // 自动旋转标签
                autoRotate: true,
                style: {
                    fill: '#A0A0A0',
                    fontSize: 12,
                },
            },
        },
        // 设置 y 轴配置
        yAxis: {
            label: {
                style: {
                    fill: '#A0A0A0',
                    fontSize: 12,
                },
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
        // 设置图表颜色
        color: '#FF6F61',
        // 设置图表样式
        columnStyle: {
            radius: [4, 4, 0, 0],
            fillOpacity: 0.8,
        },
        // 设置图表工具提示
        tooltip: {
            title: '书名',
            formatter: (datum) => ({ name: '销量', value: datum.sales }),
            showMarkers: false,
        },
        // 设置动画效果
        animation: {
            appear: {
                animation: 'scale-in-y',
                duration: 800,
            },
        },
    };

    // 配置折线图的属性
    const lineConfig = {
        // 设置数据源
        data,
        // 设置 x 轴字段
        xField: 'title',
        // 设置 y 轴字段
        yField: 'sales',
        // 设置图表颜色
        color: '#FF6F61',
        // 设置折线图样式
        lineStyle: {
            stroke: '#FF6F61',
            lineWidth: 2,
        },
        // 设置点样式
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: '#FFFFFF',
                stroke: '#FF6F61',
                lineWidth: 2,
            },
        },
        // 设置工具提示
        tooltip: {
            title: '书名',
            formatter: (datum) => ({ name: '销量', value: datum.sales }),
            showMarkers: false,
        },
        // 设置动画效果
        animation: {
            appear: {
                animation: 'path-in',
                duration: 800,
            },
        },
    };

    // 返回图表卡片组件并传入配置
    return (
        <Card
            title="Book Sales Ranking"
            style={{
                borderRadius: 8,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontFamily: "'PT Serif', 'Helvetica', sans-serif",
            }}
            bodyStyle={{
                padding: 20,
                background: '#F7F7F7',
            }}
            headStyle={{
                background: '#FF6F61',
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 'bold',
                borderRadius: '8px 8px 0 0',
            }}
        >
            <Column {...columnConfig} />
            <Line {...lineConfig} />
        </Card>
    );
}
