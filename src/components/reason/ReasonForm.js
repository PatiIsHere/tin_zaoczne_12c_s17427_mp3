import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {getReasonByIdApiCall} from "../../apiCalls/reasonApiCalls";
import {addReasonApiCall} from "../../apiCalls/reasonApiCalls";
import {updateReasonApiCall} from "../../apiCalls/reasonApiCalls";
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons";
import * as validationCommon from "../../helpers/validateCommon";

class ReasonForm extends React.Component {

    constructor(props) {
        super(props);

        const paramsIdReason = props.match.params.reasonId
        const currentFormMode = paramsIdReason ? formMode.EDIT : formMode.NEW

        this.state = {
            IdReason: paramsIdReason,
            reason: {
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

    fetchReasonDetails = () => {
        getReasonByIdApiCall(this.state.IdReason)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            reason: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            reason: data,
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

    componentDidMount() {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchReasonDetails()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const reason = {...this.state.reason};
        reason[name] = value;

        const errorMessage = this.validateField(name, value);
        // console.log(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            reason: reason,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'Name') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = '2-50znakow'
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

        return errorMessage;
    }

    validateForm = () => {
        const reason = this.state.reason;
        const errors = this.state.errors;

        for (const fieldName in reason) {
            const fieldValue = reason[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors
        });
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
                reason = this.state.reason,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addReasonApiCall(reason)

            } else if (currentFormMode === formMode.EDIT) {
                const reasonId = this.state.IdReason
                promise = updateReasonApiCall(reasonId, reason)
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
                                console.log(data)
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
                            console.log(error)
                        }
                    )
            }
        }
    }


    render() {
        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy powód' : 'Pomyślnie zaktualizowano powód'
            return (
                <Redirect to={{
                    pathname: "/reason/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy powód' : 'Edycja powodu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Typ nieobecności"
                        required
                        error={this.state.errors.Name}
                        name="Name"
                        placeholder="2-50 znaków"
                        value={this.state.reason.Name}
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="number"
                        label="% Wynagrodzenia"
                        error={this.state.errors.SalaryPercentage}
                        name="SalaryPercentage"
                        placeholder="od 0.00 do 1.00"
                        value={this.state.reason.SalaryPercentage}
                        onChange={this.handleChange}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/employee"
                    />
                </form>
            </main>
        )
    }
}

export default ReasonForm