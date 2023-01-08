import React from "react";
import {Link} from "react-router-dom";
import {getAbsenceApiCall} from "../../apiCalls/absenceApiCalls";
import AbsenceListTable from "./AbsenceListTable"

class AbsenceList extends React.Component {
    constructor(props) {
        super(props)
        const {state} = props.location;
        const notice = state && state.notice ? state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            absences: [],
            notice: notice
        }
    }

    fetchAbsenceList() {
        getAbsenceApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        absences: data
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
        this.fetchAbsenceList()
    }

    render() {
        const {error, isLoaded, absences} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych zatrudnień...</p>
        } else {
            content = <AbsenceListTable absencesList={absences}/>
        }

        return (
            <main>
                <p className="success">{this.state.notice}</p>
                <h2>Lista nieobecności</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/absence/add" className="button-add">Dodaj nową nieobecność</Link>
                </p>
            </main>
        )
    }
}

export default AbsenceList