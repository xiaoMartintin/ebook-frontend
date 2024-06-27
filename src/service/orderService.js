/* orderService.js */
import { DUMMY_RESPONSE, PREFIX, post, getJson } from "../utils/common";

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
    const { keyword, startDate, endDate, pageIndex, pageSize } = filters;
    const url = `${PREFIX}/order?keyword=${keyword || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}&pageIndex=${pageIndex || 0}&pageSize=${pageSize || 10}`;
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


export async function getAllOrders(filters = {}) {
    const { keyword, startDate, endDate, pageIndex = 0, pageSize = 8 } = filters;
    const url = `${PREFIX}/admin/orders?keyword=${keyword || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let response;
    try {
        response = await getJson(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }

    if (response.ok && Array.isArray(response.data)) {
        return {
            data: response.data,
            total: response.total
        };
    } else {
        return { data: [], total: 0 };
    }
}



