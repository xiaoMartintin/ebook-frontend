import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

/**
 * 根据关键字搜索书籍，并进行分页。
 * 发送 GET 请求到服务器以搜索书籍，包括分页参数。
 *
 * @param {string} keyword 搜索关键词。
 * @param {number} pageIndex 当前页码。
 * @param {number} pageSize 每页显示的数量。
 * @returns {Promise<object>} 返回书籍列表及总数，或在错误时返回默认值。
 */
export async function searchBooks(keyword, pageIndex, pageSize) {
    const url = `${PREFIX}/books?keyword=${encodeURIComponent(keyword)}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    try {
        return await getJson(url);
    } catch (e) {
        console.log(e);
        return { total: 0, items: [] }; // 出错时返回空列表和总数为0
    }
}

/**
 * 根据书籍ID获取书籍详情。
 * 发送 GET 请求到服务器以获取单个书籍的详细信息。
 *
 * @param {string} id 书籍的唯一标识ID。
 * @returns {Promise<object|null>} 返回书籍详情，或在错误时返回null。
 */
export async function getBookById(id) {
    const url = `${PREFIX}/book/${id}`;
    try {
        return await getJson(url);
    } catch (e) {
        console.log(e);
        return null; // 出错时返回 null 表示没有获取到书籍信息
    }
}

/**
 * 获取销量前10的书籍。
 * 发送 GET 请求到服务器获取销量排名前10的书籍列表。
 *
 * @returns {Promise<object|null>} 返回书籍列表或在错误时返回null。
 */
export async function getTop10BestSellingBooks() {
    const url = `${PREFIX}/books/rank`;
    try {
        return await getJson(url);
    } catch (e) {
        console.log(e);
        return null; // 出错时返回 null
    }
}

/**
 * 获取书籍的评论列表，并支持分页和排序。
 * 发送 GET 请求到服务器以获取评论，包括分页和排序参数。
 *
 * @param {string} bookId 书籍的ID。
 * @param {number} pageIndex 当前页码。
 * @param {number} pageSize 每页显示的数量。
 * @param {string} sort 排序方式。
 * @returns {Promise<object>} 返回评论列表及总数，或在错误时返回默认值。
 */
export async function getBookComments(bookId, pageIndex, pageSize, sort) {
    const url = `${PREFIX}/book/${bookId}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}`;
    try {
        return await getJson(url);
    } catch (e) {
        console.log(e);
        return { total: 0, items: [] }; // 出错时返回空列表和总数为0
    }
}

/**
 * 向特定书籍添加评论。
 * 发送 POST 请求到服务器以添加新的评论。
 *
 * @param {string} bookId 书籍的ID。
 * @param {string} content 评论内容。
 * @returns {Promise<object>} 返回操作的结果，成功或失败的响应。
 */
export async function addBookComment(bookId, content) {
    const url = `${PREFIX}/book/${bookId}/comments`;
    try {
        return await post(url, { content });
    } catch (e) {
        console.log(e);
        return DUMMY_RESPONSE; // 出错时返回预定义的错误响应
    }
}
