// 导出一个异步函数 handleBaseApiResponse，用于处理 API 响应
// 参数 res 是响应对象，messageApi 是显示消息的接口，onSuccess 和 onFail 是可选的回调函数
export async function handleBaseApiResponse(res, messageApi, onSuccess, onFail) {
    // 判断响应状态是否为 'ok'
    if (res.ok) {
        // 如果响应状态为 'ok'，则使用 messageApi 的 success 方法显示成功消息
        // res.message 是成功时的消息内容，0.5 是消息显示持续的时间（秒）
        await messageApi.success(res.message, 0.5);

        // 执行 onSuccess 回调函数，如果存在的话
        // ?. 是可选链操作符，当 onSuccess 不为 null 或 undefined 时才调用
        onSuccess?.();
    } else {
        // 如果响应状态不是 'ok'，则使用 messageApi 的 error 方法显示错误消息
        // res.message 是错误时的消息内容，0.5 是消息显示持续的时间（秒）
        await messageApi.error(res.message, 0.5);

        // 执行 onFail 回调函数，如果存在的话
        // ?. 是可选链操作符，当 onFail 不为 null 或 undefined 时才调用
        onFail?.();
    }
}
