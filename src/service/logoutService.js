import { DUMMY_RESPONSE, PREFIX, put } from "../utils/common";

export async function logoutService() {
    const url = `${PREFIX}/logout`;
    let res;

    try {
        res = await put(url);
        localStorage.removeItem('user');
        sessionStorage.removeItem("userId"); // 清除 sessionStorage 中的 userId
        if (res && res.sessionDuration) {
            localStorage.setItem('sessionDuration', res.sessionDuration);
        }
    } catch (e) {
        console.log("Logout failed with error:", e);
        res = DUMMY_RESPONSE;
    }

    return res;
}
