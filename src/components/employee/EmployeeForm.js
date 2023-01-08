import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {getEmployeeByIdApiCall} from "../../apiCalls/employeeApiCalls";
import {addEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import {updateEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons";
import * as validationCommon from "../../helpers/validateCommon";

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdEmployee = props.match.params.empId
        const currentFormMode = paramsIdEmployee ? formMode.EDIT : formMode.NEW

        this.state = {
            IdEmployee: paramsIdEmployee,
            emp: {
                Name: '',
                SecondName: '',
                Surname: '',
                Email: '',
                Password: ''
            },
            errors: {
                Name: '',
                SecondName: '',
                Surname: '',
                Email: '',
                Password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.IdEmployee)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            emp: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            emp: data,
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
            this.fetchEmployeeDetails()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const emp = {...this.state.emp};
        emp[name] = value;

        const errorMessage = this.validateField(name, value);
        // console.log(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            emp: emp,
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

        if (fieldName === 'SecondName') {
            if (!validationCommon.checkTextLengthRange(fieldValue, 0, 50)) {
                errorMessage = 'brak albo max 50 znakow'
            }
        }

        if (fieldName === 'Surname') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = '2-100znakow'
            }
        }

        if (fieldName === 'Email') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            } else if (!validationCommon.checkTextLengthRange(fieldValue, 6, 100)) {
                errorMessage = '6-100znakow'
            } else if (!validationCommon.checkEmail(fieldValue)) {
                errorMessage = 'prawidlowy email'
            }
        }

        if (fieldName === 'Password') {
            if (!validationCommon.checkRequired(fieldValue)) {
                errorMessage = 'wymagane'
            }
        }
        return errorMessage;
    }

    validateForm = () => {
        const emp = this.state.emp;
        const errors = this.state.errors;

        for (const fieldName in emp) {
            const fieldValue = emp[fieldName];
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
                emp = this.state.emp,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmployeeApiCall(emp)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp)
                const empId = this.state.IdEmployee
                promise = updateEmployeeApiCall(empId, emp)
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego pracownika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Redirect to={{
                    pathname: "/employee/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy pracownik' : 'Edycja pracownika'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        if (this.state.formMode === formMode.NEW) {
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="text"
                            label="Imię"
                            required
                            error={this.state.errors.Name}
                            name="Name"
                            placeholder="2-50 znaków"
                            value={this.state.emp.Name}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Drugie imię"
                            error={this.state.errors.SecondName}
                            name="SecondName"
                            placeholder="max 50 znaków"
                            value={this.state.emp.SecondName}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Nazwisko"
                            required
                            error={this.state.errors.Surname}
                            name="Surname"
                            placeholder="2-100 znaków"
                            value={this.state.emp.Surname}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Email"
                            required
                            error={this.state.errors.Email}
                            name="Email"
                            placeholder="np. nazwa@domena.pl"
                            value={this.state.emp.Email}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="password"
                            label="Password"
                            required
                            error={this.state.errors.Email}
                            name="Password"
                            placeholder="pass musi byc"
                            value={this.state.emp.Password}
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
        } else {
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="text"
                            label="Imię"
                            required
                            error={this.state.errors.Name}
                            name="Name"
                            placeholder="2-50 znaków"
                            value={this.state.emp.Name}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Drugie imię"
                            error={this.state.errors.SecondName}
                            name="SecondName"
                            placeholder="max 50 znaków"
                            value={this.state.emp.SecondName}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Nazwisko"
                            required
                            error={this.state.errors.Surname}
                            name="Surname"
                            placeholder="2-100 znaków"
                            value={this.state.emp.Surname}
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            label="Email"
                            required
                            error={this.state.errors.Email}
                            name="Email"
                            placeholder="np. nazwa@domena.pl"
                            value={this.state.emp.Email}
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
}

export default EmployeeForm