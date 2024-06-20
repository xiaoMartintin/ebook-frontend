import { DUMMY_RESPONSE } from "./common";
import { users } from "./userData"; // 新增

export async function login(username, password) {
    let result;

    try {
        // 前端进行用户名和密码比对
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            result = {
                ok: true,
                message: "登录成功！",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    nickname: user.nickname,
                }
            };
        } else {
            result = {
                ok: false,
                message: "用户名或密码错误！",
            };
        }
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        };
    }

    return result;
}
