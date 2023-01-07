import {getFormattedDate} from "../../helpers/dateHelper";
import React from "react";
import ReasonDetailsDataRow from "./ReasonDetailsDataRow"


function ReasonDetailsData(props) {
    const reason = props.reasonData;
    return (
        <React.Fragment>
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
                        <ReasonDetailsDataRow absData={abs} key={abs.IdAbsence}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )

}

export default ReasonDetailsData