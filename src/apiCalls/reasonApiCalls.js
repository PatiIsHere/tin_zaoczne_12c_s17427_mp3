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

export function addReasonApiCall(reason) {

    const reasonString = JSON.stringify(reason);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: reasonString
    }
    const promise = fetch(reasonBaseUrl, options)
    return promise
}

export function updateReasonApiCall(reasonId, reason) {
    const url = `${reasonBaseUrl}/${reasonId}`
    const reasonString = JSON.stringify(reason);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: reasonString
    }
    const promise = fetch(url, options)
    return promise
}