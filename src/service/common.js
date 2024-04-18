/**
 * 发送 GET 请求获取 JSON 数据。
 * @param {string} url 请求的 URL 地址。
 * @returns {Promise<any>} 返回解析后的 JSON 对象。
 */
export async function getJson(url) {
    const res = await fetch(url, { method: "GET", credentials: "include" });
    return res.json();
}

/**
 * 发送 GET 请求。
 * @param {string} url 请求的 URL 地址。
 * @returns {Promise<Response>} 返回 fetch 响应对象。
 */
export async function get(url) {
    const res = await fetch(url, { method: "GET", credentials: "include" });
    return res;
}

/**
 * 发送 PUT 请求更新数据。
 * @param {string} url 请求的 URL 地址。
 * @param {object} data 要更新的数据。
 * @returns {Promise<any>} 返回解析后的 JSON 对象。
 */
export async function put(url, data) {
    const opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    };
    const res = await fetch(url, opts);
    return res.json();
}

/**
 * 发送 DELETE 请求删除数据。
 * @param {string} url 请求的 URL 地址。
 * @param {object} data 要在请求体中发送的数据，通常用于指定删除条件。
 * @returns {Promise<any>} 返回解析后的 JSON 对象。
 */
export async function del(url, data) {
    const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(data)
    });
    return res.json();
}

/**
 * 发送 POST 请求创建数据。
 * @param {string} url 请求的 URL 地址。
 * @param {object} data 要创建的数据。
 * @returns {Promise<any>} 返回解析后的 JSON 对象。
 */
export async function post(url, data) {
    const opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    };
    const res = await fetch(url, opts);
    return res.json();
}

// 应用的基础 URL，默认为 'http://localhost:8080'
export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
// API 的前缀路径
export const PREFIX = `${BASEURL}/api`;
// API 文档的 URL
export const API_DOCS_URL = `${BASEURL}/api-docs`;
// 图像资源的前缀 URL
export const IMAGE_PREFIX = `${BASEURL}/images`;
// 网络错误时的虚拟响应对象
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
};
