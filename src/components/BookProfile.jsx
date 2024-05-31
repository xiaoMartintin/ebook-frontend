import React from 'react';
import { Button, Col, Image, Row, Space, Typography, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "../css/BookProfile.css";
import { Card, Pagination, Tabs } from "antd";
import { addCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import BookCommentList from "./BookCommentList";
import CommentInput from "./WriteComment";
import { addBookComment } from "../service/book";


const { Title, Paragraph } = Typography;

function BookDetails({ book, onAddCartItem }) {
    // 价格格式化，单位由分转换为元，并保留两位小数
    const formattedPrice = (book.price / 100).toFixed(2);

    return (
        <Row gutter={32}>
            <Col span={10}>
                <Image src={book.cover} height={500} />
            </Col>
            <Col span={14}>
                <Typography>
                    <Title level={2}>{book.title}</Title>
                    <Divider orientation="left">基本信息</Divider>
                    <Space direction="vertical" size="middle">
                        <Paragraph>
                            <strong>作者：</strong>{book.author}
                        </Paragraph>
                        <Paragraph>
                            <strong>销量：</strong>{book.sales}
                        </Paragraph>
                    </Space>
                    <Divider orientation="left">作品简介</Divider>
                    <div style={{ backgroundColor: "#e6f7ff", padding: "20px", borderRadius: "10px" }}>
                        <Paragraph>{book.description}</Paragraph>
                    </div>
                    <Divider orientation="left">购买选项</Divider>
                    <div className="price-info">
                        <div className="price-details">
                            <div style={{ fontSize: "30px", color: "#dd3735" }}>¥{formattedPrice}</div>
                            <div style={{ fontSize: "18px", color: "#dd3735", marginLeft: "10px" }}>（7折）</div>
                        </div>
                        <div className="promo-section">
                            <div className="promo-details">店铺促销</div>
                            <Paragraph type="secondary" className="promo-text" style={{ marginBottom: 0 }}>
                                满¥18减¥1，满¥48减¥3，满¥98减¥5，满¥198减¥10
                            </Paragraph>
                        </div>
                        <div className="promo-warning">
                            <ExclamationCircleOutlined />
                            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                部分促销不可共享，请以购物车能享受的促销为准
                            </Paragraph>
                        </div>
                        <Space size="middle" style={{ marginTop: '10px', justifyContent: 'center' }}>
                            <Button size="large" onClick={onAddCartItem}>加入购物车</Button>
                            <Button type="primary" size="large">立即购买</Button>
                        </Space>
                    </div>
                </Typography>
            </Col>
        </Row>
    );
}



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
export default function BookProfile({
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
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* 书籍详情组件 */}
                <BookDetails book={book} onAddCartItem={handleAddCartItem} />
                <Divider>书籍评论</Divider>
                {/* 评论排序选项卡 */}
                <Tabs
                    items={tabItems}
                    defaultActiveKey={sort}
                    onChange={sort => { onSortChange(sort) }}
                />
                {/* 添加评论输入框 */}
                <CommentInput placeholder="Please Enter Your Comment Here..." onSubmit={handleAddComment} />
                {/* 书籍评论列表 */}
                <BookCommentList comments={comments.items} onMutate={onMutate} />
                {/* 分页器 */}
                <Pagination
                    current={pageIndex + 1}
                    pageSize={10}
                    total={10 * comments.total}
                    onChange={onPageChange}
                />
            </Space>
        </Card>
    );
}
