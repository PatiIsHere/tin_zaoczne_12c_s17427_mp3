import React from "react";
import {Link} from "react-router-dom";
import {getAbsenceApiCall} from "../../apiCalls/absenceApiCalls";
import {getFormattedDate} from '../../helpers/dateHelper'

function AbsenceList() {
    const absenceList = getAbsenceApiCall()
    return (
        <main>
            <h2>Lista nieobecności</h2>
            <table className="table-list">
                <thead>

                <tr>
                    <th>Typ nieobecności</th>
                    <th>Data OD</th>
                    <th>Data DO</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Akceptacja</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {absenceList.map(absence => (
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
                ))}

                </tbody>
            </table>
            <p><Link to={"/absence/add/"} className="button-add">Dodaj nową nieobecność</Link></p>
        </main>

    )
}

export default AbsenceList