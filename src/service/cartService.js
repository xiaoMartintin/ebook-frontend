import { DUMMY_RESPONSE, PREFIX, del, getJson, put } from "../utils/common";

export async function getCartItems(searchTerm = "", pageIndex = 0, pageSize = 8) {
    const url = `${PREFIX}/cart?searchTerm=${searchTerm}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let response;
    try {
        response = await getJson(url);
        console.log("Fetched cart items from API:", response);
    } catch (e) {
        console.log(e);
        response = { data: { content: [], totalElements: 0 } };
    }
    return {
        items: response.data.content || [], // 从 response.data.content 中提取购物车项
        total: response.data.totalElements || 0 // 从 response.data.totalElements 中提取总数
    };
}


export async function deleteCartItem(id) {
    const url = `${PREFIX}/cart/${id}`;
    let res;
    try {
        res = await del(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function addCartItem(bookId) {
    const url = `${PREFIX}/cart?bookId=${bookId}`;
    let response;
    try {
        response = await put(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}

export async function changeCartItemQuantity(id, quantity) {
    const url = `${PREFIX}/cart/${id}?quantity=${quantity}`;
    let response;
    try {
        response = await put(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}
