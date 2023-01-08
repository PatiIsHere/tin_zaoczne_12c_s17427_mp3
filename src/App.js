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

import {getCurrentUser} from "./helpers/authHelper";

import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";
import LoginForm from "./components/other/LoginForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({user: user})
    }

    handleLogout = () => {
        localStorage.removeItem("user")
        this.setState({user: undefined})
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user: currentUser})
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Navigation handleLogout={this.handleLogout}/>
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
                        <Route exact
                               path="/login"
                               render={(props) => (
                                   <LoginForm handleLogin={this.handleLogin}/>
                               )}
                        />
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
