import { DUMMY_RESPONSE, PREFIX, post, getJson} from "../utils/common";

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


export async function getOrders(filters = {}) {
    const { keyword, startDate, endDate } = filters;
    const url = `${PREFIX}/order?keyword=${keyword || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`;
    let response;
    try {
        response = await getJson(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }

    if (response.ok && Array.isArray(response.data)) {
        return response.data;
    } else {
        return [];
    }
}
