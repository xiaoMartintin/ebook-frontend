import { DUMMY_RESPONSE, PREFIX, getJson } from "../utils/common";

export async function getStatistics(filters = {}) {
    const { startDate, endDate } = filters;
    const url = `${PREFIX}/statistics?startDate=${startDate || ''}&endDate=${endDate || ''}`;
    try {
        const data = await getJson(url);
        return data;
    } catch (e) {
        console.log(e);
        return DUMMY_RESPONSE;
    }
}

export async function getSalesStatistics(filters = {}) {
    const { startDate, endDate } = filters;
    const url = `${PREFIX}/statistics/sales?startDate=${startDate || ''}&endDate=${endDate || ''}`;
    try {
        const data = await getJson(url);
        console.log("data", data);
        return data;
    } catch (e) {
        console.log(e);
        return DUMMY_RESPONSE;
    }
}

export async function getUserPurchaseStatistics(filters = {}) {
    const { startDate, endDate } = filters;
    const url = `${PREFIX}/statistics/users?startDate=${startDate || ''}&endDate=${endDate || ''}`;
    try {
        const data = await getJson(url);
        console.log("data", data);
        return data;
    } catch (e) {
        console.log(e);
        return DUMMY_RESPONSE;
    }
}
