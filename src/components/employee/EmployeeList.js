import React from "react";
import {Link} from "react-router-dom";
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";

function EmployeeList() {
    const employeeList = getEmployeeApiCall()
    return (
        <main>
            <h2>Lista pracowników</h2>
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
                {employeeList.map(emp => (
                    <tr key={emp.IdEmployee}>
                        <td>{emp.Name}</td>
                        <td>{emp.SecondName}</td>
                        <td>{emp.Surname}</td>
                        <td>{emp.Email}</td>
                        <td>
                            <ul className="list-actions">
                                <div>
                                    <li><Link to={`/employee/details/${emp.IdEmployee}`}
                                              className="list-actions-button-details">Szczegóły</Link></li>
                                    <li><Link to={`/employee/edit/${emp.IdEmployee}`}
                                              className="list-actions-button-edit">Edytuj</Link></li>
                                    <li><Link to={`/employee/delete/${emp.IdEmployee}`}
                                              className="list-actions-button-delete">Usuń</Link></li>
                                </div>
                            </ul>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <p><Link to={"/employee/add/"} className="button-add">Dodaj nowego pracownika</Link></p>
        </main>

    )
}

export default EmployeeList