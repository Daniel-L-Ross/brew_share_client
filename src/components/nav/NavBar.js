import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

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

            <li className="navbar__item">Add Entry</li>

            <li className="navbar__item">My Entries</li>

            <li className="navbar__item">My Favorites</li>

            <li className="navbar__item">Coffee</li>

            <li className="navbar__item">Brew Methods</li>
        </ul>
    )
}