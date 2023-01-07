import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getReasonApiCall, getReasonByIdApiCall} from '../../apiCalls/reasonApiCalls'
import ReasonDetailsData from "./ReasonDetailsData"
import {getFormattedDate} from '../../helpers/dateHelper'
import EmployeeDetailsData from "../employee/EmployeeDetailsData";

class ReasonDetails extends React.Component {

    constructor(props) {
        super(props)
        let {reasonId} = this.props.match.params
        this.state = {
            reasonId: reasonId,
            reason: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchReasonList = () => {
        getReasonByIdApiCall(this.state.reasonId)
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
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchReasonList()
    }

    render() {
        const {reason, error, isLoaded, message} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message} </p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych powodu...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ReasonDetailsData reasonData={reason}/>
        }

        return (
            <main>
                <h2>Szczegóły powodu</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/reason" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }

    // return (
    //     <main>
    //         <h2>Szczegóły powodu</h2>
    //         <p>Typ nieobecności: {reason.Name}</p>
    //         <p>% Wynagrodzenia: {reason.SalaryPercentage}</p>
    //         <h2>Lista nieobecności</h2>
    //         <table className="table-list">
    //             <thead>
    //             <tr>
    //                 <th>Pracownik</th>
    //                 <th>Data OD</th>
    //                 <th>Data DO</th>
    //                 <th>Akceptacja</th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {reason.absences.map(
    //                 abs =>
    //                     <tr key={abs.IdAbsence}>
    //                         <td>{abs.employee.Name + ", " + (abs.employee.SecondName ? abs.employee.SecondName + " " : "") + abs.employee.Surname}</td>
    //                         <td>{abs.DateFrom ? getFormattedDate(abs.DateFrom) : ""}</td>
    //                         <td>{abs.DateTo ? getFormattedDate(abs.DateTo) : ""}</td>
    //                         <td>{abs.IsAccepted ? "Tak" : "Nie"}</td>
    //                     </tr>
    //             )}
    //             </tbody>
    //         </table>
    //         <div className="section-buttons">
    //             <Link to="/reason" className="button-back">Powrót</Link>
    //         </div>
    //     </main>
    // )
}

export default ReasonDetails