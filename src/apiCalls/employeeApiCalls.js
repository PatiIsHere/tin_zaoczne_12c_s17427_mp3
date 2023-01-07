import {employeeList, employeeDetailList} from "./employeeApiMockData";

const employeeBaseUrl = 'http://localhost:3000/api/employee'

export function getEmployeeApiCall() {
    return employeeList;
}

// export function getEmployeeApiCall() {
//     const promise = fetch(employeeBaseUrl)
//     return promise;
// }

export function getEmployeeByIdApiCall(empId) {
    const emp = employeeDetailList.find(emp => emp.IdEmployee === empId)
    console.log(emp)
    return emp;
}