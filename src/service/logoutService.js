import { DUMMY_RESPONSE, PREFIX, put } from "../utils/common";

// 定义 logoutService 函数
export async function logoutService() {
    const url = `${PREFIX}/logout`; // 设置请求的 URL
    let res;

    try {
        // 发送登出请求并等待响应
        res = await put(url);

        // 移除本地存储中的用户数据
        localStorage.removeItem('user');

        // 检查响应内容是否包含会话时长，并存储到 localStorage 中
        if (res && res.sessionDuration) {
            // 将会话时长存储到 localStorage 中
            localStorage.setItem('sessionDuration', res.sessionDuration);
        }

    } catch (e) {
        // 捕获异常并输出错误信息
        console.log("Logout failed with error:", e);
        res = DUMMY_RESPONSE;
    }

    // 返回响应结果
    return res;
}
