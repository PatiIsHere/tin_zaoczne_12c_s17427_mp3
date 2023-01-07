import {Link} from "react-router-dom";
import React from "react";


function ReasonListTableRow(props) {
    const reason = props.reasonData;
    return (
        <tr>
            <td>{reason.Name}</td>
            <td>{reason.SalaryPercentage}</td>
            <td>
                <ul className="list-actions">
                    <div>
                        <li><Link to={`/reason/details/${reason.IdReason}`}
                                  className="list-actions-button-details">Szczegóły</Link></li>
                        <li><Link to={`/reason/edit/${reason.IdReason}`}
                                  className="list-actions-button-edit">Edytuj</Link></li>
                        <li><Link to={`/reason/delete/${reason.IdReason}`}
                                  className="list-actions-button-delete">Usuń</Link></li>
                    </div>
                </ul>
            </td>
        </tr>
    )
}

export default ReasonListTableRow