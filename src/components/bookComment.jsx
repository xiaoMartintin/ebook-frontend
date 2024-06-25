import { List, Space, Typography, Avatar, Button } from "antd";
import { formatTime } from "../utils/time";
import CommentInput from "./writeComment";
import { likeComment, replyComment, unlikeComment } from "../service/commentService";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import LikeButton from "./likeButton";

const { Text } = Typography;

/**
 * 书籍评论组件，用于展示和操作一个评论。
 * 支持回复、点赞和取消点赞功能。
 *
 * @param {object} comment 评论对象。
 * @param {boolean} isReplying 是否正在回复状态。
 * @param {Function} onReply 触发回复状态的回调函数。
 * @param {Function} onMutate 触发评论更新的回调函数。
 * @returns React元素。
 */
export default function BookComment({ comment, isReplying, onReply, onMutate }) {
    const [messageApi, contextHolder] = useMessage();  // 使用消息上下文

    // 构建回复信息前缀
    const replyPrefix = comment.reply ? `Reply to ${comment.reply}: ` : '';

    // 处理点击回复链接
    const handleReplyClick = (event) => {
        event.preventDefault();
        onReply();
    };

    // 提交评论回复
    const handleReplySubmit = async (replyContent) => {
        const response = await replyComment(comment.id, replyContent);
        handleBaseApiResponse(response, messageApi, onMutate);
    };

    // 处理点赞
    const handleLike = async () => {
        const response = await likeComment(comment.id);
        handleBaseApiResponse(response, messageApi);
        return response.ok;
    };

    // 处理取消点赞
    const handleUnlike = async () => {
        const response = await unlikeComment(comment.id);
        handleBaseApiResponse(response, messageApi);
        return response.ok;
    };

    // 构建评论内容
    const commentContent = (
        <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ backgroundColor: "#E6F7FF", padding: "10px", borderRadius: "5px" }}>
                <p style={{ fontSize: 16, color: "black", margin: 0 }}>{replyPrefix}{comment.content}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                <Text type="secondary">{formatTime(comment.createdAt)}</Text>
                <Space size="middle">
                    <LikeButton
                        defaultNumber={comment.like}
                        liked={comment.liked}
                        onLike={handleLike}
                        onUnlike={handleUnlike}
                    />
                    <Button type="link" onClick={handleReplyClick} style={{ padding: 0, fontSize: 14 }}>Reply</Button>
                </Space>
            </div>
            {isReplying && (
                <CommentInput
                    placeholder={`Reply to ${comment.username}:`}
                    onSubmit={handleReplySubmit}
                />
            )}
        </Space>
    );


    // 渲染组件
    return (
        <>
            {contextHolder}
            <List.Item key={comment.id} style={{ padding: "20px 0", borderBottom: "1px solid #e8e8e8" }}>
                <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: "#87d068" }}>{comment.username[0].toUpperCase()}</Avatar>}
                    title={<Text strong style={{ color: "#333" }}>{comment.username}</Text>}
                    description={commentContent}
                />
            </List.Item>
        </>
    );
}
