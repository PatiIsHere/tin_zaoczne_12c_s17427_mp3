import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from '../../helpers/authHelper'

class Navigation extends React.Component {

    render() {
        const loginLogoutLink = isAuthenticated() ?
            <button onClick={this.props.handleLogout}>logout</button> :
            <Link to="/login">login</Link>


        return (
            <nav>
                <ul>
                    <li><Link to={"/"}>Strona główna</Link></li>
                    <li><Link to={"/absence"}>Nieobecności</Link></li>
                    <li><Link to={"/employee"}>Pracownicy</Link></li>
                    <li><Link to={"/reason"}>Powody</Link></li>
                    <li className='lang'>{loginLogoutLink}</li>
                    <li>
                        <button onClick={() => {
                            this.handleLanguageChange('pl')
                        }}>PL
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {
                            this.handleLanguageChange('en')
                        }}>EN
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation