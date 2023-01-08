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

export function addEmployeeApiCall(emp) {

    const empString = JSON.stringify(emp);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(employeeBaseUrl, options)
    return promise
}

export function updateEmployeeApiCall(empId, emp) {
    delete emp['Password']
    const url = `${employeeBaseUrl}/${empId}`
    const empString = JSON.stringify(emp);
    console.log(empString)
    delete empString['Password']
    delete empString['absences']
    console.log(empString)

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(url, options)
    return promise
}