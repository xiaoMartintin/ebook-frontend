import { DUMMY_RESPONSE, PREFIX, del, getJson, put } from "./common";

/**
 * 获取购物车中所有项目的信息。
 * 发送 GET 请求到服务端以获取当前用户购物车中的所有项目。
 *
 * @returns {Promise<Array>} 如果成功，返回购物车中项目的数组；如果失败，返回空数组。
 */
export async function getCartItems() {
    const url = `${PREFIX}/cart`; // 构造访问购物车的 URL
    try {
        // 从服务器获取购物车项目
        return await getJson(url);
    } catch (e) {
        console.log(e); // 控制台输出异常信息
        return []; // 异常时返回空数组以保证函数返回类型的一致性
    }
}

/**
 * 从购物车中删除一个项目。
 * 发送 DELETE 请求到服务端以删除指定ID的购物车项目。
 *
 * @param {number|string} id 要删除的购物车项目的ID。
 * @returns {Promise<object>} 根据操作结果返回响应对象。
 */
export async function deleteCartItem(id) {
    const url = `${PREFIX}/cart/${id}`; // 构造删除特定购物车项目的 URL
    try {
        // 向服务器发送删除请求
        return await del(url);
    } catch (e) {
        console.log(e); // 控制台输出异常信息
        return DUMMY_RESPONSE; // 异常时返回虚拟的错误响应
    }
}

/**
 * 向购物车添加一个项目。
 * 发送 PUT 请求到服务端以添加一个指定的书籍ID到购物车中。
 *
 * @param {number|string} bookId 要添加到购物车的书籍ID。
 * @returns {Promise<object>} 根据操作结果返回响应对象。
 */
export async function addCartItem(bookId) {
    const url = `${PREFIX}/cart?bookId=${bookId}`; // 构造添加书籍到购物车的 URL
    try {
        // 向服务器发送添加请求
        return await put(url);
    } catch (e) {
        console.log(e); // 控制台输出异常信息
        return DUMMY_RESPONSE; // 异常时返回虚拟的错误响应
    }
}

/**
 * 更改购物车中的项目数量。
 * 发送 PUT 请求到服务端以修改特定购物车项目的数量。
 *
 * @param {number|string} id 要修改数量的购物车项目ID。
 * @param {number} number 新的数量值。
 * @returns {Promise<object>} 根据操作结果返回响应对象。
 */
export async function changeCartItemNumber(id, number) {
    const url = `${PREFIX}/cart/${id}?number=${number}`; // 构造修改购物车项目数量的 URL
    try {
        // 向服务器发送修改请求
        return await put(url);
    } catch (e) {
        console.log(e); // 控制台输出异常信息
        return DUMMY_RESPONSE; // 异常时返回虚拟的错误响应
    }
}
