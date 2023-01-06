import {employeeList, employeeDetailList} from "./employeeApiMockData";

export function getEmployeeApiCall() {
    return employeeList;
}

export function getEmployeeByIdApiCall(empId) {
    const emp = employeeDetailList.find(emp => emp.IdEmployee === empId)
    console.log(emp)
    return emp;
}