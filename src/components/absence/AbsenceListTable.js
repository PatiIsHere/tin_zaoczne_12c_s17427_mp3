import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import AbsenceListTableRow from "./AbsenceListTableRow"

function AbsenceListTable(props) {
    const absences = props.absencesList
    return (
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
            {absences.map(absence => (
                <AbsenceListTableRow absenceData={absence} key={absence.IdAbsence}/>
            ))}

            </tbody>
        </table>
    )
}

export default AbsenceListTable