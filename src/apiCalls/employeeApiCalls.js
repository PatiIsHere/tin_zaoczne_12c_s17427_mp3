import {employeeList, employeeDetailList} from "./employeeApiMockData";

const employeeBaseUrl = 'http://localhost:3000/api/employee'

export function getEmployeeApiCall() {
    const promise = fetch(employeeBaseUrl)
    return promise;
}

export function getEmployeeByIdApiCall(empId) {
    const url = `${employeeBaseUrl}/${empId}`
    const promise = fetch(url)
    return promise;
}