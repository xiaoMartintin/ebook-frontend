import { DUMMY_RESPONSE, PREFIX, del, getJson, put } from "./common";

export async function getCartItems() {
    const url = `${PREFIX}/cart`;
    let cartItems;
    try {
        cartItems = await getJson(url);
        console.log("Fetched cart items from API:", cartItems); // 添加调试信息
    } catch (e) {
        console.log(e);
        cartItems = [];
    }
    return Array.isArray(cartItems.data) ? cartItems.data : []; // 确保返回一个数组，并提取data字段
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
