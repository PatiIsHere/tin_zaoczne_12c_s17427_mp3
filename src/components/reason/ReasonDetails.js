import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getReasonByIdApiCall} from '../../apiCalls/reasonApiCalls'
import {getFormattedDate} from '../../helpers/dateHelper'

function ReasonDetails() {
    let {reasonId} = useParams()
    reasonId = parseInt(reasonId)
    const reason = getReasonByIdApiCall(reasonId)
    console.log(reason)

    return (
        <main>
            <h2>Szczegóły powodu</h2>
            <p>Typ nieobecności: {reason.Name}</p>
            <p>% Wynagrodzenia: {reason.SalaryPercentage}</p>
            <h2>Lista nieobecności</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Pracownik</th>
                    <th>Data OD</th>
                    <th>Data DO</th>
                    <th>Akceptacja</th>
                </tr>
                </thead>
                <tbody>
                {reason.absences.map(
                    abs =>
                        <tr key={abs.IdAbsence}>
                            <td>{abs.employee.Name + ", " + (abs.employee.SecondName ? abs.employee.SecondName + " " : "") + abs.employee.Surname}</td>
                            <td>{abs.DateFrom ? getFormattedDate(abs.DateFrom) : ""}</td>
                            <td>{abs.DateTo ? getFormattedDate(abs.DateTo) : ""}</td>
                            <td>{abs.IsAccepted ? "Tak" : "Nie"}</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/reason" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}

export default ReasonDetails