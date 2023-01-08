import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";

function AbsenceDetailsData(props) {
    const absence = props.absenceData;
    return (
        <React.Fragment>
            <p>Typ nieobecności: {absence.reason.Name}</p>
            <p>Data OD: {absence.DateFrom ? getFormattedDate(absence.DateFrom) : ""}</p>
            <p>Data DO: {absence.DateTo ? getFormattedDate(absence.DateTo) : ""}</p>
            <p>Pracownik: {absence.employee.Name + ", " + (absence.employee.SecondName ? absence.employee.SecondName + " " : "") + absence.employee.Surname}</p>
            <p>Akceptacja: {absence.IsAccepted}</p>
            <p>% Wynagrodzenia: {absence.reason.SalaryPercentage}</p>
        </React.Fragment>
    )
}

export default AbsenceDetailsData