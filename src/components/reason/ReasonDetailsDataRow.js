import {getFormattedDate} from "../../helpers/dateHelper";
import React from "react";

function ReasonDetailsDataRow(props) {
    const abs = props.absData;
    return (
        <tr key={abs.IdAbsence}>
            <td>{abs.employee.Name + ", " + (abs.employee.SecondName ? abs.employee.SecondName + " " : "") + abs.employee.Surname}</td>
            <td>{abs.DateFrom ? getFormattedDate(abs.DateFrom) : ""}</td>
            <td>{abs.DateTo ? getFormattedDate(abs.DateTo) : ""}</td>
            <td>{abs.IsAccepted ? "Tak" : "Nie"}</td>
        </tr>
    )
}

export default ReasonDetailsDataRow