import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getEmployeeByIdApiCall} from '../../apiCalls/employeeApiCalls'
import EmployeeDetailsData from "./EmployeeDetailsData";

function EmployeeDetails() {
    // let {empId} = useParams()
    //  const [empId, setEmpId] = useState(useParams());
    // empId = parseInt(empId)
    const [empId, setEmpId] = useState(useParams());
    const [emp, setEmp] = useState(null);
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        checkState();
        getEmpDetails();
    }, [])


    const checkState = () => {
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych kierowcy</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <EmployeeDetailsData emp={emp}/>
        }

        return content
    }

    const getEmpDetails = () => {
        getEmployeeByIdApiCall(empId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setEmp(null);
                        setMessage(data.message);
                    } else {
                        setEmp(data);
                        setMessage(null)
                    }
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error)
                }
            )
    }
    return (
        <main>
            <h2>Szczegóły pracownika</h2>
            {checkState()}
            <div className="section-buttons">
                <Link to="/employee" className="button-back">Powrót</Link>
            </div>
        </main>
    )

}

export default EmployeeDetails