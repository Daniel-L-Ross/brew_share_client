import React from "react"
import { Link } from "react-router-dom"
import { username } from "../auth/authSettings"
import "./NavBar.css"

const handleLogout = () => {
    localStorage.clear()
}

export const NavBar = () => {

    return (
        <nav className="navbar sticky">
            <div className="navbar__item">
                <Link to="/">
                    brew_share
                </Link>
            </div>

            <div className="navbar__item">
                <Link to="/">
                    Entries
                </Link>
            </div>

            <div className="navbar__item">
                <Link to="/entries/create">
                    Add Entry
                </Link>
            </div>

            <div className="navbar__item">
                <Link to={`/${username()}/my-entries`}>
                    My Entries
                </Link>
            </div>

            <div className="navbar__item">
                <Link to={`/${username()}/favorites`}>
                    My Favorites
                </Link>
            </div>

            <div className="navbar__item">
                <Link to="/coffee">
                    Coffee
                </Link>
            </div>

            <div className="navbar__item">
                <Link to="/brew-methods">
                    Brew Methods
                </Link>
            </div>

            <div className="navbar__item" >
                <a href="/" onClick={handleLogout}>
                    Logout
                </a>
            </div>
        </nav>
    )
}