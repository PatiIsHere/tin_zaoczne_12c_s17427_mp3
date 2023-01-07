import React from "react";
import {Link} from "react-router-dom";

class ReasonForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Dodaj powód</h2>

                <form className="form">
                    <label htmlFor="Name">Typ nieobecności: <abbr title={"required"}
                                                                  aria-label={"required"}>*</abbr></label>
                    <input type="text" name="Name" id="Name" placeholder="2-50 znaków" value={""}/>
                    <span id="errorReasonName" className="errors-text"></span>

                    <label htmlFor="SalaryPercentage">% Wynagrodzenia: <abbr title={"required"}
                                                                             aria-label={"required"}>*</abbr></label>
                    <input type="number" name="SalaryPercentage" id="SalaryPercentage" placeholder="od 0.00 do 1.00"
                           value={""}/>
                    <span id="errorSalaryPercentage" className="errors-text"></span>

                    <div className="form-buttons">
                        <span id="errorsSummary" className="errors-text"></span>
                        <input type="submit" value="Dodaj" className="form-button-submit"/>
                        <Link to="/reason" className="form-button-cancel">Anuluj</Link>
                    </div>

                </form>

            </main>
        )
    }
}

export default ReasonForm