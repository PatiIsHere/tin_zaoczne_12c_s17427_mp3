import React from "react";
import {useTranslation} from "react-i18next";

function Header() {
    const {t} = useTranslation()
    return (
        <header>
            <h1>Register of absences</h1>
            <img src="/images/REGISTER_OF_ABSENCES_LOGO.png" alt="Register of absences Logo" className="main-logo"/>
        </header>
    );
}

export default Header;
