import React from "react";
import EmployeeDetailsDataRow from "./EmployeeDetailsDataRow";
import {getFormattedDate} from "../../helpers/dateHelper";

function EmployeeDetailsData(props) {
    const emp = props.empData;
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default EmployeeDetailsData