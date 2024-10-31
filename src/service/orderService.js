import { DUMMY_RESPONSE, PREFIX, post, getJson } from "../utils/common";
import { createWebSocket } from "../utils/websocketUtils";

export async function placeOrder(orderInfo, onOrderUpdate) {
    const url = `${PREFIX}/order`;
    let res;

    try {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            // 构造正确的 WebSocket URL
            const wsUrl = `ws://localhost:8082/websocket/transfer/${userId}`;
            createWebSocket(wsUrl, (orderUpdate) => {
                console.log("Order update received in placeOrder:", orderUpdate); // 调试输出
                if (orderUpdate.message) {
                    console.log("Message from WebSocket:", orderUpdate.message);
                }
                if (onOrderUpdate) {
                    onOrderUpdate(orderUpdate.message); // 将 WebSocket 消息传递给 CartItemTable
                }
            });
        } else {
            console.error("User ID is undefined, cannot establish WebSocket connection.");
        }

        res = await post(url, orderInfo);
    } catch (e) {
        console.error("Error placing order:", e);
        res = DUMMY_RESPONSE;
    }
    return res;
}


export async function getOrders(filters = {}) {
    const { keyword = '', startDate = '', endDate = '', pageIndex = 0, pageSize = 10 } = filters;
    const url = `${PREFIX}/order?keyword=${encodeURIComponent(keyword)}&startDate=${startDate}&endDate=${endDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let response;

    try {
        response = await getJson(url);
        console.log("Response received:", JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Error fetching orders:", e);
        response = DUMMY_RESPONSE;
    }

    if (response.ok && response.data && Array.isArray(response.data.content)) {
        // console.log("Orders data:", JSON.stringify(response.data.content, null, 2));
        return {
            content: response.data.content,
            totalElements: response.data.totalElements
        };
    } else {
        return {
            content: [],
            totalElements: 0
        };
    }
}

export async function getAllOrders(filters = {}) {
    const { keyword = '', startDate = '', endDate = '', pageIndex = 0, pageSize = 8 } = filters;
    const url = `${PREFIX}/admin/orders?keyword=${encodeURIComponent(keyword)}&startDate=${startDate}&endDate=${endDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let response;

    try {
        response = await getJson(url);
        console.log("Response received:", JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Error fetching all orders:", e);
        response = DUMMY_RESPONSE;
    }

    if (response.ok && response.data && Array.isArray(response.data.content)) {
        console.log("All orders data:", JSON.stringify(response.data.content, null, 2));
        return {
            content: response.data.content,
            totalElements: response.data.totalElements
        };
    } else {
        return {
            content: [],
            totalElements: 0
        };
    }
}
