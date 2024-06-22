export async function getJson(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res.json();  // 返回解析后的JSON数据
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res;  // 返回响应对象
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();  // 返回解析后的JSON数据
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res.json();  // 返回解析后的JSON数据
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();  // 返回解析后的JSON数据
}

export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';  // 基础URL
export const PREFIX = `${BASEURL}/api`;  // API前缀
export const API_DOCS_URL = `${BASEURL}/api-docs`;  // API文档URL
export const IMAGE_PREFIX = `${BASEURL}/images`;  // 图片URL前缀
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"  // 响应出错时的默认消息
}
