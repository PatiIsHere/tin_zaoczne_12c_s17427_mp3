import {reasonList, reasonDetailList} from "./reasonApiMockData";

const reasonBaseUrl = 'http://localhost:3000/api/reason'

export function getReasonApiCall() {
    return reasonList;
}

// export function getReasonApiCall() {
//     const promise = fetch(reasonBaseUrl)
//     return promise;
// }

export function getReasonByIdApiCall(reasonId) {
    const reason = reasonDetailList.find(reason => reason.IdReason === reasonId)
    console.log(reason)
    return reason;
}