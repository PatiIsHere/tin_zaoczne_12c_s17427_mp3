import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";


function AbsenceListTableRow(props) {
    const absence = props.absenceData;
    return (
        <tr key={absence.IdAbsence}>
            <td>{absence.reason.Name}</td>
            <td>{absence.DateFrom ? getFormattedDate(absence.DateFrom) : ""}</td>
            <td>{absence.DateTo ? getFormattedDate(absence.DateTo) : ""}</td>
            <td>{absence.employee.Name}</td>
            <td>{absence.employee.Surname}</td>
            <td>{absence.IsAccepted ? "Tak" : "Nie"}</td>
            <td>
                <ul className="list-actions">
                    <div>
                        <li><Link to={`/absence/details/${absence.IdAbsence}`}
                                  className="list-actions-button-details">Szczegóły</Link></li>
                        <li><Link to={`/absence/edit/${absence.IdAbsence}`}
                                  className="list-actions-button-edit">Edytuj</Link></li>
                        <li><Link to={`/absence/delete/${absence.IdAbsence}`}
                                  className="list-actions-button-delete">Usuń</Link></li>
                    </div>
                </ul>
            </td>
        </tr>
    )
}

export default AbsenceListTableRow