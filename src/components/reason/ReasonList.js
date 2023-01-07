import React from "react";
import {Link} from "react-router-dom";
import {getReasonApiCall} from "../../apiCalls/reasonApiCalls";

function ReasonList() {
    const reasonList = getReasonApiCall()
    return (
        <main>
            <h2>Lista pracowników</h2>
            <table className="table-list">
                <thead>

                <tr>
                    <th>Typ nieobecności</th>
                    <th>% Wynagrodzenia</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {reasonList.map(reason => (
                    <tr key={reason.IdReason}>
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
                ))}

                </tbody>
            </table>
            <p><Link to={"/reason/add/"} className="button-add">Dodaj nowy powód</Link></p>
        </main>

    )
}

export default ReasonList