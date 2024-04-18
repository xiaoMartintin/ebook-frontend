// 导入所需组件
import { Space, Input, Row, Col, Button } from "antd"
// 导入 useState hook
import { useState } from "react";

const { TextArea } = Input;

// 定义评论输入组件
export default function CommentInput({ placeholder, onSubmit }) {
    // 定义提交评论事件处理函数
    const handleSubmit = () => {
        // 调用提交回调函数，并传入评论内容
        onSubmit?.(text);
        // 清空评论输入框
        setText('');
    }

    // 使用 useState hook 初始化评论内容状态
    const [text, setText] = useState('');

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {/* 多行文本输入框 */}
            <TextArea
                autoFocus
                placeholder={placeholder}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            {/* 行布局，将按钮放置于右侧 */}
            <Row justify="end">
                {/* 列布局，设置按钮样式 */}
                <Col>
                    {/* 发布按钮 */}
                    <Button type="primary" onClick={handleSubmit}>发布</Button>
                </Col>
            </Row>
        </Space>
    );
}
