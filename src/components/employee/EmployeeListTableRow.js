import React from "react";
import {Link} from "react-router-dom";

function EmployeeListTableRow(props) {
    const emp = props.empData;
    return (
        <tr>
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
    )
}

export default EmployeeListTableRow