import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    let res;
    try {
        res = await post(url, orderInfo);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getOrders() {
    const url = `${PREFIX}/order`;
    let response;
    try {
        response = await getJson(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }

    // 确保返回的是订单数组
    if (response.ok && Array.isArray(response.data)) {
        return response.data;
    } else {
        return [];
    }
}
