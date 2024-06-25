import { PREFIX, get, put } from "../utils/common";

// 获取所有用户
export async function getAllUsers() {
    const url = `${PREFIX}/users`;
    let result;

    try {
        result = await get(url);
        result = await result.json();  // 解析JSON数据
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        };
    }

    return result;
}

// 改变用户状态（启用/禁用）
export async function changeUserStatus(userId, isEnabled) {
    const url = `${PREFIX}/users/${userId}/status`;
    let result;

    try {
        result = await put(url, { is_enabled: isEnabled });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        };
    }

    return result;
}
