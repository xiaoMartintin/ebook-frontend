import { List, Space, Typography } from "antd";
import BookComment from "./BookComment";
import { useState } from "react";

const { Text } = Typography;

/**
 * 书籍评论列表组件，用于展示一个书籍的所有评论并处理评论的回复。
 *
 * @param {Array} comments 评论列表数据。
 * @param {Function} onMutate 评论数据变更时的回调函数，用于通知外部数据可能需要更新。
 * @returns React元素，渲染一个评论列表，每个评论项可以进行回复操作。
 */
export default function BookCommentList({ comments, onMutate }) {
    // 使用useState管理当前正在回复的评论ID，初始值为-1表示没有回复活动。
    const [replyingCommentId, setReplyingCommentId] = useState(-1);

    // 处理评论变更后的操作，重置回复状态并调用外部的onMutate回调。
    const handleMutate = () => {
        onMutate?.();
        setReplyingCommentId(-1);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '10px' }}>
            <Text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>评论列表</Text>
            <Space direction="vertical" style={{ width: '100%' }}>
                <List
                    itemLayout="vertical"
                    dataSource={comments}
                    renderItem={comment => (
                        <BookComment
                            comment={comment}
                            isReplying={replyingCommentId === comment.id} // 根据ID判断是否为当前回复中的评论
                            onMutate={handleMutate} // 评论发生变化时的处理函数
                            onReply={() => setReplyingCommentId(comment.id)} // 设置当前正在回复的评论ID
                        />
                    )}
                />
            </Space>
        </div>
    );
}
