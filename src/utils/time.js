
/**
 * 格式化时间
 * @param {number} time - 时间戳（毫秒）
 * @returns {string} - 格式化后的时间字符串，格式为：YYYY/MM/DD HH:MM
 */

export function formatTime(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}