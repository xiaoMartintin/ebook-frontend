import { PREFIX, getJson } from "../utils/common";

// 根据书名关键字模糊查找书籍作者信息
export async function getBookAuthorByName(bookName) {
    const url = `${PREFIX}/microservice/getBookAuthorByName/${bookName}`;
    let authors;
    try {
        authors = await getJson(url);
    } catch (e) {
        console.error("Error fetching author information:", e);
        authors = [];
    }
    return authors;
}
