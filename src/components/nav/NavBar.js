import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

const handleLogout = () => {
    localStorage.clear()
}

export const NavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/">
                    brew_share
                </Link>
            </li>

            <li className="navbar__item">
                <Link to="/">
                    Entries
                </Link>
            </li>

            <li className="navbar__item">
                <Link to="/entries/create">
                    Add Entry
                </Link>
            </li>

            <li className="navbar__item">My Entries</li>

            <li className="navbar__item">My Favorites</li>

            <li className="navbar__item">
                <Link to="/coffee">
                    Coffee
                </Link>
            </li>

            <li className="navbar__item">
                <Link to="/brew-methods">
                    Brew Methods
                </Link>
            </li>

            <a href="/" onClick={handleLogout}>
                <li className="navbar__item" >
                    Logout
                </li>
            </a>
        </ul>
    )
}