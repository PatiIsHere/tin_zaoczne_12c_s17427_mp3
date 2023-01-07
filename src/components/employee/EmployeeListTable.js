import React from "react";
import EmployeeListTableRow from "./EmployeeListTableRow"
import {Link} from "react-router-dom";

function EmployeeListTable(props) {
    const employees = props.empList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Imię</th>
                <th>Drugie imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {employees.map(emp =>
                <EmployeeListTableRow empData={emp} key={emp.IdEmployee}/>
            )}

            </tbody>
        </table>
    )
}

export default EmployeeListTable;