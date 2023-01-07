import {reasonList, reasonDetailList} from "./reasonApiMockData";

const reasonBaseUrl = 'http://localhost:3000/api/reason'

export function getReasonApiCall() {
    const promise = fetch(reasonBaseUrl)
    return promise;
}

export function getReasonByIdApiCall(reasonId) {
    const url = `${reasonBaseUrl}/${reasonId}`
    const promise = fetch(url)
    return promise;
}