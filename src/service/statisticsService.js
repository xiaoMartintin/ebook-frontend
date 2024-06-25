import { DUMMY_RESPONSE, PREFIX, getJson} from "../utils/common";

export async function getStatistics(filters = {}) {
    const { startDate, endDate } = filters;
    const url = `${PREFIX}/statistics?startDate=${startDate || ''}&endDate=${endDate || ''}`;
    let response;
    try {
        response = await getJson(url);
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }

    return response;
}
