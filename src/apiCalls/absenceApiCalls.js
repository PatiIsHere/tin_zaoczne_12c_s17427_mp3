import {absenceList, absenceDetailList} from "./absenceApiMockData";

const absenceBaseUrl = 'http://localhost:3000/api/absence'

// export function getAbsenceApiCall() {
//     return absenceList;
// }

export function getAbsenceApiCall() {
    const promise = fetch(absenceBaseUrl)
    return promise;
}

export function getAbsenceByIdApiCall(absenceId) {
    const url = `${absenceBaseUrl}/${absenceId}`
    const promise = fetch(url)
    return promise;
}

export function addAbsenceApiCall(absence) {
    const absenceString = JSON.stringify(absence)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: absenceString
    }
    const promise = fetch(absenceBaseUrl, options)
    return promise
}

export function updateAbsenceApiCall(absenceId, absence) {

    const url = `${absenceBaseUrl}/${absenceId}`
    const absenceString = JSON.stringify(absence);

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: absenceString
    }
    const promise = fetch(url, options)
    return promise

}