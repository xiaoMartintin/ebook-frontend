import { Button, Col, Image, Row, Space, Typography, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * BookDetails 组件展示书籍的详细信息。
 * 包括书籍的封面、标题、作者、销量、简介以及购买选项。
 *
 * @param {object} book 书籍对象，包含书籍的详细信息。
 * @param {Function} onAddCartItem 当添加书籍到购物车时调用的函数。
 * @returns React元素，渲染书籍的详细信息页面。
 */
export default function BookDetails({ book, onAddCartItem }) {
    // 价格格式化，单位由分转换为元，并保留两位小数
    const formattedPrice = (book.price / 100).toFixed(2);

    return (
        <Row>
            <Col span={9}>
                <Image src={book.cover} height={500} />
            </Col>
            <Col span={15}>
                <Typography>
                    <Title level={2}>{book.title}</Title>
                    <Divider orientation="left">基本信息</Divider>
                    <Space direction="horizontal">
                        <Paragraph>
                            作者：{book.author}
                            <Divider type="vertical" />
                            销量：{book.sales}
                        </Paragraph>
                    </Space>
                    <Divider orientation="left">作品简介</Divider>
                    <Paragraph>{book.description}</Paragraph>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%" }}>
                            <Paragraph type="secondary" style={{ marginBottom: 0 }}>抢购价</Paragraph>
                            <div>
                                <Space>
                                    <div style={{ color: "#dd3735", fontSize: "16px" }}>¥</div>
                                    <div style={{ color: "#dd3735", fontSize: "30px" }}>{formattedPrice}</div>
                                    <div style={{ color: "#dd3735", fontSize: "18px" }}>（7折）</div>
                                </Space>
                            </div>
                            <div>
                                <Space>
                                    <div style={{
                                        backgroundColor: "#f48484",
                                        padding: "4px",
                                        borderRadius: "5px",
                                        color: "white"
                                    }}>店铺促销</div>
                                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                        满¥18减¥1，满¥48减¥3，满¥98减¥5，满¥198减¥10
                                    </Paragraph>
                                </Space>
                            </div>
                            <Space>
                                <ExclamationCircleOutlined />
                                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                    部分促销不可共享，请以购物车能享受的促销为准
                                </Paragraph>
                            </Space>
                        </div>
                        <Space>
                            <Button size="large" onClick={onAddCartItem}>加入购物车</Button>
                            <Button type="primary" size="large">立即购买</Button>
                        </Space>
                    </Space>
                </Typography>
            </Col>
        </Row>
    );
}
