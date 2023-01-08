import React from "react";
import Header from "./components/fragments/Header"
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeDetails from "./components/employee/EmployeeDetails";
import EmployeeForm from "./components/employee/EmployeeForm";

import AbsenceList from "./components/absence/AbsenceList";
import AbsenceDetails from "./components/absence/AbsenceDetails";
import AbsenceForm from "./components/absence/AbsenceForm";

import ReasonList from "./components/reason/ReasonList";
import ReasonDetails from "./components/reason/ReasonDetails";
import ReasonForm from "./components/reason/ReasonForm";

import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={MainContent}/>
                    <Route exact path="/employee" component={EmployeeList}/>
                    <Route exact path="/employee/details/:empId" component={EmployeeDetails}/>
                    <Route exact path="/employee/add/" component={EmployeeForm}/>
                    <Route exact path="/employee/edit/:empId" component={EmployeeForm}/>
                    <Route exact path="/absence" component={AbsenceList}/>
                    <Route exact path="/absence/add/" component={AbsenceForm}/>
                    <Route exact path="/absence/details/:absenceId" component={AbsenceDetails}/>
                    <Route exact path="/absence/edit/:absenceId" component={AbsenceForm}/>
                    <Route exact path="/reason" component={ReasonList}/>
                    <Route exact path="/reason/details/:reasonId" component={ReasonDetails}/>
                    <Route exact path="/reason/add/" component={ReasonForm}/>
                    <Route exact path="/reason/edit/:reasonId" component={ReasonForm}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
