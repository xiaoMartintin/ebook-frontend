// 导入所需的常量和函数：DUMMY_RESPONSE 为出错时的响应备选，PREFIX 为API前缀，put 为PUT请求方法
import { DUMMY_RESPONSE, PREFIX, put } from "./common";

// 定义并导出一个异步函数 logout，用于处理用户登出
export async function logout() {
    // 构造登出API的完整URL
    const url = `${PREFIX}/logout`;

    // 初始化响应变量
    let res;

    try {
        // 发送 PUT 请求到登出端点
        res = await put(url);
    } catch (e) {
        // 如果请求发生异常，打印异常信息到控制台
        console.log(e);
        // 设置响应为预定义的假响应，保证即使出错也能返回一致的响应格式
        res = DUMMY_RESPONSE;
    }

    // 返回响应结果，可能是成功的登出响应或假的错误响应
    return res;
}
