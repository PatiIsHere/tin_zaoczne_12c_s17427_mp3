import React from 'react'
import {Link} from 'react-router-dom'
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import {getReasonApiCall} from "../../apiCalls/reasonApiCalls";
import formMode from "../../helpers/formHelper";

class AbsenceForm extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdAbsence = props.match.params.absenceId
        const currentFormMode = paramsIdAbsence ? formMode.EDIT : formMode.NEW

        this.state = {
            IdAbsence: paramsIdAbsence,
            absence: {
                Name: '',
                SalaryPercentage: ''
            },
            errors: {
                Name: '',
                SalaryPercentage: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    render() {
        const allEmps = getEmployeeApiCall()
        const allReasons = getReasonApiCall()

        return (
            <main>
                <h2>Dodawanie nieobecności</h2>
                <form className="form">
                    <label htmlFor="IdReason">Typ nieobecności: <abbr title="required"
                                                                      aria-label="required">*</abbr></label>
                    <select id="employee" name="empId" required>
                        <option value="">-- Wybierz typ nieobecności --</option>
                        {allReasons.map(reason =>
                            (<option key={reason.IdReason} value={reason.IdReason}
                                     label={reason.Name}></option>)
                        )}
                    </select>
                    <span id="errorReasonName" className="errors-text"></span>

                    <label htmlFor="DateFrom">Data OD</label>
                    <input type="date" name="DateFrom" value="" id="DateFrom"/>
                    <span id="errorDateFrom" className="errors-text"></span>

                    <label htmlFor="DateTo">Data DO</label>
                    <input type="date" name="DateTo" value="" id="DateTo"/>
                    <span id="errorDateTo" className="errors-text"></span>

                    <label htmlFor="IdEmployee">Pracownik: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="IdEmployee" name="IdEmployee" required>
                        <option value="">-- Wybierz pracownika --</option>
                        {allEmps.map(emp =>
                            (<option key={emp.IdEmployee} value={emp.IdEmployee}
                                     label={emp.Name + ", " + (emp.SecondName ? emp.SecondName + " " : "") + emp.Surname}></option>)
                        )}
                    </select>
                    <span id="errorEmployee" className="errors-text"></span>

                    <label htmlFor="IsAccepted">Akceptacja: <abbr title="required"
                                                                  aria-label="required">*</abbr></label>
                    <select id="IsAccepted" name="IsAccepted" required>
                        <option value="">-- Wybierz akceptacje --</option>
                        <option value="0">Nie</option>
                        <option value="1">Tak</option>

                    </select>
                    <span id="errorIsAccepted" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj"/>
                        <Link to="/absence" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default AbsenceForm