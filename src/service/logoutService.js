import { DUMMY_RESPONSE, PREFIX, put } from "../utils/common";

export async function logoutService() {
    const url = `${PREFIX}/logout`;
    let res;
    try {
        res = await put(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}