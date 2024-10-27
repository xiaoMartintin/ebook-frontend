let websocket = null;
let lockReconnect = false;

const heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    reset() {
        clearInterval(this.timeoutObj);
        return this;
    },
    start() {
        this.timeoutObj = setInterval(() => {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({ type: 'HeartBeat' }));
            }
        }, this.timeout);
    }
};

export const createWebSocket = (userId, handleEvent) => {
    if (!userId) {
        console.error("User ID is undefined, cannot establish WebSocket connection");
        return;
    }

    const url = `ws://localhost:8081/websocket/transfer/${userId}`;
    websocket = new WebSocket(url);

    websocket.onopen = function () {
        console.log("WebSocket connected");
        heartCheck.reset().start();
    };

    websocket.onerror = function () {
        console.error("WebSocket error");
        reconnect(userId, handleEvent);
    };

    websocket.onclose = function () {
        console.log("WebSocket disconnected");
        reconnect(userId, handleEvent);
    };

    websocket.onmessage = function (event) {
        console.log("WebSocket message received:", event.data); // 确认收到消息
        try {
            const message = JSON.parse(event.data);
            if (handleEvent) {
                handleEvent(message); // 确保调用了 handleEvent 回调
            }
        } catch (e) {
            console.error("Failed to parse message:", e);
        }
    };
};


const reconnect = (userId, handleEvent) => {
    // console.log("reconnect function: userId: ", userId);
    if (lockReconnect) return;
    lockReconnect = true;

    setTimeout(() => {
        createWebSocket(userId, handleEvent);
        lockReconnect = false;
    }, 4000);
};

export const closeWebSocket = () => {
    if (websocket) {
        websocket.close();
        console.log("WebSocket disconnected manually");
    }
};
