import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>Strona główna</Link></li>
                <li><Link to={"/absence"}>Nieobecności</Link></li>
                <li><Link to={"/employee"}>Pracownicy</Link></li>
                <li><Link to={"/reason"}>Powody</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation