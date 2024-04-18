// 导入通用函数和变量，PREFIX 用于API的基础URL，post 为封装的POST请求方法
import { PREFIX, post } from "./common";

// 定义并导出一个异步函数 login，用于处理用户登录
export async function login(username, password) {
    // 构建API的完整URL
    const url = `${PREFIX}/login`;

    // 初始化结果变量
    let result;

    try {
        // 使用 post 方法发送登录请求，包括用户名和密码
        result = await post(url, { username, password });
    } catch (e) {
        // 如果请求过程中发生错误，输出错误到控制台，并设置结果为失败消息
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        };
    }

    // 返回请求结果，包含登录成功或失败的状态和消息
    return result;
}
