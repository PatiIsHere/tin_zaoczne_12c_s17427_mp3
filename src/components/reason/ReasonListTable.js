import React from "react";
import ReasonListTableRow from "./ReasonListTableRow"

function ReasonListTable(props) {
    const reasons = props.reasonList
    return (
        <table className="table-list">
            <thead>

            <tr>
                <th>Typ nieobecności</th>
                <th>% Wynagrodzenia</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {reasons.map(reason => (
                <ReasonListTableRow reasonData={reason} key={reason.IdReason}/>
            ))}

            </tbody>
        </table>
    )
}

export default ReasonListTable