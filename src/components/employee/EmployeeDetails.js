import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getEmployeeByIdApiCall} from '../../apiCalls/employeeApiCalls'
import {getFormattedDate, getFormattedBoolean} from '../../helpers/dateHelper'

function EmployeeDetails() {
    let {empId} = useParams()
    empId = parseInt(empId)
    const emp = getEmployeeByIdApiCall(empId)
    console.log(emp)

    return (
        <main>
            <h2>Szczegóły pracownika</h2>
            <p>Imię: {emp.Name}</p>
            <p>Drugie imię: {emp.SecondName}</p>
            <p>Nazwisko: {emp.Surname} </p>
            <p>E-mail: {emp.Email} </p>
            <h2>Lista nieobecności</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Typ nieobecności</th>
                    <th>Data OD</th>
                    <th>Data DO</th>
                    <th>Akceptacja</th>
                    <th>% Wynagrodzenia</th>
                </tr>
                </thead>
                <tbody>
                {emp.absences.map(
                    abs =>
                        <tr key={abs.IdAbsence}>
                            <td>{abs.reason.Name}</td>
                            <td>{abs.DateFrom ? getFormattedDate(abs.DateFrom) : ""}</td>
                            <td>{abs.DateTo ? getFormattedDate(abs.DateTo) : ""}</td>
                            <td>{abs.IsAccepted ? "Tak" : "Nie"}</td>
                            <td>{abs.reason.SalaryPercentage}</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/employees" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}

export default EmployeeDetails