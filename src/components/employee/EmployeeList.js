import React from "react";
import {Link} from "react-router-dom";
import {getEmployeeApiCall} from "../../apiCalls/employeeApiCalls";
import EmployeeListTable from "./EmployeeListTable";

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        const {state} = props.location;
        const notice = state && state.notice ? state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            employees: [],
            notice: notice
        }
    }

    fetchEmployeeList = () => {
        getEmployeeApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        employees: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchEmployeeList()
    }

    render() {
        const {error, isLoaded, employees} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message} </p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracowników...</p>
        } else {
            content = <EmployeeListTable empList={employees}/>
        }

        return (
            <main>
                <p className="success">{this.state.notice}</p>
                <h2>Lista pracowników</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/employee/add" className="button-add">Dodaj nowego pracownika</Link>
                </p>
            </main>
        )

    }
}

export default EmployeeList