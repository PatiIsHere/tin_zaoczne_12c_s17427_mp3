import React from "react";
import {Link} from "react-router-dom";
import {getReasonApiCall} from "../../apiCalls/reasonApiCalls";
import ReasonListTable from "./ReasonListTable"

class ReasonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            reasons: []
        }
    }

    fetchReasonList = () => {
        getReasonApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        reasons: data
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
        this.fetchReasonList()
    }

    render() {
        const {error, isLoaded, reasons} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message} </p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych powodów...</p>
        } else {
            content = <ReasonListTable reasonList={reasons}/>
        }

        return (
            <main>
                <h2>Lista powodów</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/reason/add" className="button-add">Dodaj nowy powód</Link>
                </p>
            </main>
        )

    }
}

export default ReasonList