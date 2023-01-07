import {absenceList, absenceDetailList} from "./absenceApiMockData";

const absenceBaseUrl = 'http://localhost:3000/api/absence'

export function getAbsenceApiCall() {
    return absenceList;
}

// export function getAbsenceApiCall() {
//     const promise = fetch(absenceBaseUrl)
//     return promise;
// }

export function getAbsenceByIdApiCall(absenceId) {
    const absence = absenceDetailList.find(absence => absence.IdAbsence === absenceId)
    console.log(absence)
    return absence;
}