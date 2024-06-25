// 导入必要的组件
import { Space, Input, Row, Col, Button } from "antd"
// 导入 useState 钩子
import { useState } from "react";

const { TextArea } = Input;

// 定义 CommentInput 组件
export default function CommentInput({ placeholder, onSubmit }) {
// 定义 handleSubmit 函数来处理评论的提交
    const handleSubmit = () => {
// 调用提交回调函数，并传递评论文本
        onSubmit?.(text);
// 清空评论输入框
        setText('');
    }

// 使用 useState 钩子初始化评论文本的状态
    const [text, setText] = useState('');

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {/* 多行文本输入框 */}
            <TextArea
                autoFocus
                placeholder={placeholder}
                value={text}
                onChange={e => setText(e.target.value)}
                style={{
                    borderRadius: '10px',
                    borderColor: '#00A3D9',
                    padding: '10px',
                    fontFamily: 'PT Serif, Helvetica, sans-serif',
                    fontSize: '16px',
                    color: '#333'
                }}
            />
            {/* 横向布局将按钮放置在右侧 */}
            <Row justify="end" style={{ marginTop: '10px' }}>
                {/* 纵向布局设置按钮样式 */}
                <Col>
                    {/* 提交按钮 */}
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: '#00A3D9',
                            borderColor: '#00A3D9',
                            borderRadius: '10px',
                            padding: '5px 15px',
                            fontFamily: 'PT Serif, Helvetica, sans-serif',
                            fontSize: '16px'
                        }}
                    >
                        提交
                    </Button>
                </Col>
            </Row>
        </Space>
    );
}

