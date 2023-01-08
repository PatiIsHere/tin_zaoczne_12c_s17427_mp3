import React from 'react'
import {Redirect} from 'react-router-dom'
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import {getReasonApiCall} from "../../apiCalls/reasonApiCalls";
import formMode from "../../helpers/formHelper";
import {addAbsenceApiCall, getAbsenceByIdApiCall, updateAbsenceApiCall} from "../../apiCalls/absenceApiCalls";
import * as validationCommon from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {getFormattedDate} from "../../helpers/dateHelper"

class AbsenceForm extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdAbsence = props.match.params.absenceId
        const currentFormMode = paramsIdAbsence ? formMode.EDIT : formMode.NEW

        this.state = {
            IdAbsence: paramsIdAbsence,
            absence: {
                IdEmployee: '',
                IdReason: '',
                DateFrom: '',
                DateTo: '',
                IsAccepted: ''
            },
            errors: {
                IdEmployee: '',
                IdReason: '',
                DateFrom: '',
                DateTo: '',
                IsAccepted: ''
            },
            allReason: [],
            allEmp: [],
            allIsAccepted: [{value: '0', boolValue: false, textValue: 'Nie'}, {
                value: '1',
                boolValue: true,
                textValue: 'Tak'
            }],
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchAbsenceDetails = () => {
        getAbsenceByIdApiCall(this.state.IdAbsence)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            absence: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            absence: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    fetchAllReason = () => {
        getReasonApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        allReason: data
                    })

                })
    }

    fetchAllEmp = () => {
        getEmployeeApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        allEmp: data
                    })

                })
    }

    componentDidMount() {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchAbsenceDetails()
        }
        this.fetchAllReason()
        this.fetchAllEmp()
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const absence = {...this.state.absence};
        absence[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            absence: absence,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'IdReason') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            }
        }

        if (fieldName === 'SalaryPercentage') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkNumber(fieldValue)) {
                errorMessage = 'ma byc liczba'
            } else if (!validationCommon.checkNumberRange(fieldValue, 0, 1)) {
                errorMessage = 'od 0.00 do 1.00'
            }
        }

        if (fieldName === 'DateFrom') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkDate(fieldValue)) {
                errorMessage = 'ma byc data'
            }
            if (this.state.formMode === formMode.NEW) {
                let nowDate = new Date(),
                    month = '' + (nowDate.getMonth() + 1),
                    day = '' + nowDate.getDate(),
                    year = '' + nowDate.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                const nowString = [year, month, day].join('-');

                if (!validationCommon.checkDateIsAfter(fieldValue, nowString)) {
                    errorMessage = 'nie moze byc z przeszlosci'
                }
            }
        }

        if (fieldName === 'DateTo') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkDate(fieldValue)) {
                errorMessage = 'ma byc data'
            } else {
                if (!validationCommon.checkDateIsAfter(getFormattedDate(fieldValue), getFormattedDate(this.state.absence.DateFrom))) {
                    errorMessage = 'nie moze byc przed data od'
                }
            }
        }

        if (fieldName === 'IdEmployee') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            }
        }

        if (fieldName === 'IsAccepted') {
            if (!validationCommon.checkRequired(fieldValue.toString())) {
                errorMessage = 'wymagane'
            }
        }

        return errorMessage;
    }

    validateForm = () => {
        const absence = this.state.absence;
        const errors = this.state.errors;

        for (const fieldName in absence) {
            const fieldValue = absence[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors
        });
        console.log("Errory")
        console.log(this.state.errors)
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const fieldName in errors) {
            if (errors[fieldName]) {
                return true;
            }
        }
        return false;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                absence = this.state.absence,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addAbsenceApiCall(absence)

            } else if (currentFormMode === formMode.EDIT) {
                const absenceId = this.state.IdAbsence
                promise = updateAbsenceApiCall(absenceId, absence)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                        }
                    )
            }
        }
    }


    render() {
        const allEmps = getEmployeeApiCall()
        const allReasons = getReasonApiCall()

        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nową nieobecność' : 'Pomyślnie zaktualizowano nieobecność'
            return (
                <Redirect to={{
                    pathname: "/absence/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowa nieobecność' : 'Edycja nieobecności'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="IdReason">Typ nieobecności: <abbr title="required"
                                                                      aria-label="required">*</abbr></label>
                    {!this.state.IdAbsence &&
                        <select id="IdReason" name="IdReason" onChange={this.handleChange} required>
                            <option value="">-- Wybierz typ nieobecności --</option>
                            {this.state.allReason.map(reason =>
                                (<option key={reason.IdReason} value={reason.IdReason}
                                         label={reason.Name}></option>)
                            )}
                        </select>}
                    {this.state.IdAbsence &&
                        <select id="IdReason" name="IdReason" onChange={this.handleChange} required>
                            <option
                                value={this.state.allReason.find(reason => reason.IdReason === this.state.absence.IdReason)?.IdReason}>{this.state.allReason.find(reason => reason.IdReason === this.state.absence.IdReason)?.Name}
                            </option>
                            {
                                this.state.allReason.filter(reason => reason.IdReason !== this.state.absence.IdReason).map(reason => (
                                    <option key={reason.IdReason} value={reason.IdReason}>{reason.Name}</option>
                                ))
                            }
                        </select>}
                    <span id="errorReasonName" className="errors-text"></span>
                    <FormInput
                        type="date"
                        label="Data OD"
                        required
                        error={this.state.errors.DateFrom}
                        name="DateFrom"
                        placeholder="dd-MM-rrrr"
                        value={getFormattedDate(this.state.absence.DateFrom)}
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="date"
                        label="Data DO"
                        required
                        error={this.state.errors.DateTo}
                        name="DateTo"
                        placeholder="dd-MM-rrrr"
                        value={getFormattedDate(this.state.absence.DateTo)}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="IdEmployee">Pracownik: <abbr title="required" aria-label="required">*</abbr></label>
                    {!this.state.IdAbsence &&
                        <select id="IdEmployee" name="IdEmployee" onChange={this.handleChange} required>
                            <option value="">-- Wybierz pracownika --</option>
                            {this.state.allEmp.map(emp =>
                                (<option key={emp.IdEmployee} value={emp.IdEmployee}
                                         label={emp.Name + ", " + (emp.SecondName ? emp.SecondName + " " : "") + emp.Surname}></option>)
                            )}
                        </select>}
                    {this.state.IdAbsence &&
                        <select id="IdEmployee" name="IdEmployee" onChange={this.handleChange} required>
                            <option
                                value={this.state.allEmp.find(emp => emp.IdEmployee === this.state.absence.IdEmployee)?.IdEmployee}>
                                {this.state.allEmp.find(emp => emp.IdEmployee === this.state.absence.IdEmployee)?.Name + ", "
                                    + (this.state.allEmp.find(emp => emp.IdEmployee === this.state.absence.IdEmployee)?.SecondName ? this.state.allEmp.find(emp => emp.IdEmployee === this.state.absence.IdEmployee)?.SecondName + " " : "")
                                    + this.state.allEmp.find(emp => emp.IdEmployee === this.state.absence.IdEmployee)?.Surname}
                            </option>
                            {
                                this.state.allReason.filter(reason => reason.IdReason !== this.state.absence.IdReason).map(reason => (
                                    <option key={reason.IdReason} value={reason.IdReason}>{reason.Name}</option>
                                ))
                            }
                        </select>}
                    <span id="errorEmployee" className="errors-text"></span>

                    <label htmlFor="IsAccepted">Akceptacja: <abbr title="required"
                                                                  aria-label="required">*</abbr></label>
                    {!this.state.IdAbsence &&
                        <select id="IsAccepted" name="IsAccepted" onChange={this.handleChange} required>
                            <option value="">-- Wybierz akceptacje --</option>
                            {this.state.allIsAccepted.map(isAccepted =>
                                (<option key={isAccepted.value} value={isAccepted.value}
                                         label={isAccepted.textValue}></option>)
                            )}

                        </select>
                    }
                    {this.state.IdAbsence &&
                        <select id="IsAccepted" name="IsAccepted" onChange={this.handleChange} required>
                            <option
                                value={this.state.allIsAccepted.find(isAccepted => isAccepted.boolValue === this.state.absence.IsAccepted)?.value}>{this.state.allIsAccepted.find(isAccepted => isAccepted.boolValue === this.state.absence.IsAccepted)?.textValue}
                            </option>
                            {
                                this.state.allIsAccepted.filter(isAccepted => isAccepted.boolValue !== this.state.absence.IsAccepted).map(isAccepted => (
                                    <option key={isAccepted.value}
                                            value={isAccepted.value}>{isAccepted.textValue}</option>
                                ))
                            }
                        </select>
                    }
                    <span id="errorIsAccepted" className="errors-text"></span>
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/absence"
                    />
                </form>
            </main>
        )
    }
}

export default AbsenceForm