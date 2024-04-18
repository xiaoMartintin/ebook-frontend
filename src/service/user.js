// 导入所需的常量和方法
import { DUMMY_RESPONSE, PREFIX, getJson, put } from "./common";

/**
 * 获取当前登录用户的信息。
 * 尝试从服务端获取当前用户的详细信息，如果请求失败，则返回 null。
 *
 * @returns {Promise<object|null>} 返回用户信息对象或 null
 */
export async function getMe() {
    const url = `${PREFIX}/user/me`;  // 构建请求URL
    try {
        return await getJson(url);  // 使用 getJson 方法发送请求并直接返回结果
    } catch (e) {
        console.log(e);  // 控制台输出错误信息
        return null;  // 发生错误时返回 null
    }
}

/**
 * 修改当前用户的密码。
 * 发送新密码到服务端以更新，如果请求成功，返回服务端响应；如果失败，返回虚拟响应。
 *
 * @param {object} request 包含密码更新信息的对象
 * @returns {Promise<object>} 返回服务端的响应对象
 */
export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;  // 构建请求URL
    try {
        return await put(url, request);  // 使用 put 方法发送请求并直接返回结果
    } catch (e) {
        console.log(e);  // 控制台输出错误信息
        return DUMMY_RESPONSE;  // 发生错误时返回预设的虚拟响应
    }
}
