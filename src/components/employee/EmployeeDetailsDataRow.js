import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";

function EmployeeDetailsDataRow(props) {
    const abs = props.absData;
    return (

        <tr key={abs.IdAbsence}>
            <td>{abs.reason.Name}</td>
            <td>{abs.DateFrom ? getFormattedDate(abs.DateFrom) : ""}</td>
            <td>{abs.DateTo ? getFormattedDate(abs.DateTo) : ""}</td>
            <td>{abs.IsAccepted ? "Tak" : "Nie"}</td>
            <td>{abs.reason.SalaryPercentage}</td>
        </tr>
    )
}

export default EmployeeDetailsDataRow