import React from "react";
import {Link} from "react-router-dom";

class EmployeeForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Dodaj pracownika</h2>

                <form className="form">
                    <label htmlFor="Name">Imię: <abbr title={"required"} aria-label={"required"}>*</abbr></label>
                    <input type="text" name="Name" id="Name" placeholder="2-50 znaków" value={""}/>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="SecondName">Drugie imię: </label>
                    <input type="text" name="SecondName" id="SecondName" placeholder="max 50 znaków"/>
                    <span id="errorSecondName" className="errors-text"></span>

                    <label htmlFor="Surname">Nazwisko: <abbr title={"required"} aria-label={"required"}>*</abbr></label>
                    <input type="text" name="Surname" id="Surname" placeholder="2-100 znaków" value={""}/>
                    <span id="errorLastName" className="errors-text"></span>

                    <label htmlFor="Email">Email: <abbr title={"required"} aria-label={"required"}>*</abbr></label>
                    <input type="text" name="Email" id="Email" placeholder="6-100 znaków" value={""}/>
                    <span id="errorLastName" className="errors-text"></span>

                    <label htmlFor="Password">Hasło: <abbr title={"required"}
                                                           aria-label={"required"}>*</abbr></label>
                    <input type="password" name="Password" id="Password" placeholder="preferowane 6 znaków" value={""}/>
                    <span id="errorPassword" className="errors-text"></span>

                    <div className="form-buttons">
                        <span id="errorsSummary" className="errors-text"></span>
                        <input type="submit" value="Dodaj" className="form-button-submit"/>
                        <Link to="/employee" className="form-button-cancel">Anuluj</Link>
                    </div>

                </form>

            </main>
        )
    }
}

export default EmployeeForm