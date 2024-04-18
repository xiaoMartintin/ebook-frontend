// 导入所需的常量和方法
import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

/**
 * 提交订单信息到服务器。
 * 这个函数尝试通过 POST 方法向服务器提交订单信息，并处理可能的错误。
 *
 * @param {object} orderInfo 包含订单详细信息的对象
 * @returns {Promise<object>} 返回服务器的响应或者虚拟响应
 */
export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;  // 定义请求的 URL
    try {
        // 尝试发送 POST 请求并直接返回结果
        return await post(url, orderInfo);
    } catch (e) {
        console.log(e);  // 如果捕获到异常，打印异常信息
        return DUMMY_RESPONSE;  // 返回虚拟响应
    }
}

/**
 * 获取所有订单信息。
 * 这个函数尝试从服务器获取当前用户的所有订单信息，并在发生错误时返回空数组。
 *
 * @returns {Promise<Array>} 返回订单列表或空数组
 */
export async function getOrders() {
    const url = `${PREFIX}/order`;  // 定义请求的 URL
    try {
        // 尝试使用 getJson 方法获取数据并直接返回结果
        return await getJson(url);
    } catch (e) {
        console.log(e);  // 如果捕获到异常，打印异常信息
        return [];  // 发生错误时返回空数组
    }
}
