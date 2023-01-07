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
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Header/>
            <Navigation/>
            <Routes>
                <Route exact path="/" element={<MainContent/>}/>
                <Route exact path="/employee" element={<EmployeeList/>}/>
                <Route exact path="employee/details/:empId" element={<EmployeeDetails/>}/>
                <Route exact path="employee/add/" element={<EmployeeForm/>}/>
                <Route exact path="employee/edit/:empId" element={<EmployeeForm/>}/>
                <Route exact path="/absence" element={<AbsenceList/>}/>
                <Route exact path="absence/details/:absenceId" element={<AbsenceDetails/>}/>
                <Route exact path="absence/add/" element={<AbsenceForm/>}/>
                <Route exact path="absence/edit/:empId" element={<AbsenceForm/>}/>
                <Route exact path="/reason" element={<ReasonList/>}/>
                <Route exact path="reason/details/:reasonId" element={<ReasonDetails/>}/>
                <Route exact path="reason/add/" element={<ReasonForm/>}/>
                <Route exact path="reason/edit/:empId" element={<ReasonForm/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
