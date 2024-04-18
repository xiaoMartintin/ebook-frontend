import { DUMMY_RESPONSE, PREFIX, post, put } from "./common";

/**
 * 回复评论。
 * 发送用户的回复内容到指定的评论 ID。
 *
 * @param {string} commentId 评论的唯一标识ID。
 * @param {string} content 用户的回复内容。
 * @returns {Promise<object>} 返回操作的结果，成功或失败的响应。
 */
export async function replyComment(commentId, content) {
    const url = `${PREFIX}/comment/${commentId}`; // 构建请求的完整URL
    try {
        // 发送 POST 请求，包含用户回复内容
        return await post(url, { 'content': content });
    } catch (e) {
        console.log(e); // 在控制台输出错误信息
        return DUMMY_RESPONSE; // 在出现错误时返回一个虚拟的错误响应
    }
}

/**
 * 为评论点赞。
 * 向服务器发送点赞请求，针对特定的评论ID。
 *
 * @param {string} commentId 评论的唯一标识ID。
 * @returns {Promise<object>} 返回操作的结果，成功或失败的响应。
 */
export async function likeComment(commentId) {
    const url = `${PREFIX}/comment/${commentId}/like`; // 构建请求的完整URL
    try {
        // 发送 PUT 请求来点赞
        return await put(url);
    } catch (e) {
        console.log(e); // 在控制台输出错误信息
        return DUMMY_RESPONSE; // 在出现错误时返回一个虚拟的错误响应
    }
}

/**
 * 取消对评论的点赞。
 * 向服务器发送取消点赞请求，针对特定的评论ID。
 *
 * @param {string} commentId 评论的唯一标识ID。
 * @returns {Promise<object>} 返回操作的结果，成功或失败的响应。
 */
export async function unlikeComment(commentId) {
    const url = `${PREFIX}/comment/${commentId}/unlike`; // 构建请求的完整URL
    try {
        // 发送 PUT 请求来取消点赞
        return await put(url);
    } catch (e) {
        console.log(e); // 在控制台输出错误信息
        return DUMMY_RESPONSE; // 在出现错误时返回一个虚拟的错误响应
    }
}
