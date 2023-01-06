import React from "react";
import Header from "./components/fragments/Header"
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeDetails from "./components/employee/EmployeeDetails";
import EmployeeForm from "./components/employee/EmployeeForm";

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
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
