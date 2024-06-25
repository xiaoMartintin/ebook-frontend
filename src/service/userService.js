import { DUMMY_RESPONSE, PREFIX, getJson, put, post } from "../utils/common";

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let me = null;
    try {
        me = await getJson(url);
        console.log(me);
    } catch(e) {
        console.log(e);
    }
    return me;
}

export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;
    let res;
    try {
        res = await put(url, request);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function register(username, nickname, password, email) {
    const url = `${PREFIX}/user/register`;
    let res;
    try {
        res = await post(url, { username, nickname, password, email });
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}


