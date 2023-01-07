import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getAbsenceByIdApiCall} from '../../apiCalls/absenceApiCalls'
import {getFormattedDate} from '../../helpers/dateHelper'

function AbsenceDetails() {
    let {absenceId} = useParams()
    absenceId = parseInt(absenceId)
    const absence = getAbsenceByIdApiCall(absenceId)
    console.log(absence)

    return (
        <main>
            <h2>Szczegóły nieobecności</h2>
            <p>Typ nieobecności: {absence.reason.Name}</p>
            <p>Data OD: {absence.DateFrom ? getFormattedDate(absence.DateFrom) : ""}</p>
            <p>Data DO: {absence.DateTo ? getFormattedDate(absence.DateTo) : ""}</p>
            <p>Pracownik: {absence.employee.Name + ", " + (absence.employee.SecondName ? absence.employee.SecondName + " " : "") + absence.employee.Surname}</p>
            {/*<p>Pracownik: {absence.employee.Name}</p>*/}
            <p>Akceptacja: {absence.IsAccepted}</p>
            <p>% Wynagrodzenia: {absence.reason.SalaryPercentage}</p>

            <div className="section-buttons">
                <Link to="/absence" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}

export default AbsenceDetails