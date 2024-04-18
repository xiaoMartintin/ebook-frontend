import { List, Space } from "antd";
import UsernameAvatar from "./username_avatar";
import LikeButton from "./like_button";
import { formatTime } from "../utils/time";
import CommentInput from "./comment_input";
import { likeComment, replyComment, unlikeComment } from "../service/comment";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";

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
    const replyPrefix = comment.reply ? `回复 ${comment.reply}：` : '';

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
            <p style={{ fontSize: 16, color: "black", margin: 0 }}>{replyPrefix}{comment.content}</p>
            <Space>
                {/* 格式化显示评论时间 */}
                {formatTime(comment.createdAt)}
                <LikeButton
                    defaultNumber={comment.like}
                    liked={comment.liked}
                    onLike={handleLike}
                    onUnlike={handleUnlike}
                />
                <button style={{
                    color: "grey",
                    fontSize: 14,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer"
                }}
                        onClick={handleReplyClick}>回复
                </button>
            </Space>
            {isReplying && (
                <CommentInput
                    placeholder={`回复 ${comment.username}：`}
                    onSubmit={handleReplySubmit}
                />
            )}
        </Space>
    );

    // 渲染组件
    return (
        <>
            {contextHolder}
            <List.Item key={comment.id}>
                <List.Item.Meta
                    avatar={<UsernameAvatar username={comment.username} />}
                    title={<div style={{ color: "grey" }}>{comment.username}</div>}
                    description={commentContent}
                />
            </List.Item>
        </>
    );
}
