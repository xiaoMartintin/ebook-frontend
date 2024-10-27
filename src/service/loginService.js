import { PREFIX, post } from "../utils/common";

export async function loginService(username, password) {
    const url = `${PREFIX}/login`;
    let result;

    try {
        result = await post(url, { username, password });
        if (result.ok) {
            // 登录成功时将 userId 存储在 sessionStorage 中
            sessionStorage.setItem("userId", result.data.id);
        }
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}
