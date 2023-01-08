import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getAbsenceByIdApiCall} from '../../apiCalls/absenceApiCalls'
import AbsenceDetailsData from "./AbsenceDetailsData";

class AbsenceDetails extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        let {absenceId} = this.props.match.params
        this.state = {
            absenceId: absenceId,
            absence: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchAbsenceDetails = () => {
        getAbsenceByIdApiCall(this.state.absenceId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            absence: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            absence: data,
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
        this.fetchAbsenceDetails()
    }

    render() {
        const {absence, error, isLoaded, message} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message} </p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych nieobecności...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <AbsenceDetailsData absenceData={absence}/>
        }

        return (
            <main>
                <h2>Szczegóły nieobecności</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/absence" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }
}

export default AbsenceDetails