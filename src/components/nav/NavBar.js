import React from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { username } from "../auth/authSettings"
import "./NavBar.css"

const handleLogout = () => {
    localStorage.clear()
}

export const NavBar = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <div className="navbar__item">
                        <Link to="/">
                            brew_share
                        </Link>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>

                            <div className="navbar__item">
                                <Link to="/">
                                    Entries
                                </Link>
                            </div>
                        </Nav.Link>

                        <Nav.Link>
                            <div className="navbar__item">
                                <Link to="/entries/create">
                                    Add Entry
                                </Link>
                            </div>
                        </Nav.Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">

                            <NavDropdown.Item>
                                <div className="navbar__item">
                                    <Link to={`/${username()}/my-entries`}>
                                        My Entries
                                    </Link>
                                </div>
                            </NavDropdown.Item>
                            
                            <NavDropdown.Item>
                                <div className="navbar__item">
                                    <Link to={`/${username()}/favorites`}>
                                        My Favorites
                                    </Link>
                                </div>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <div className="navbar__item">
                                    <Link to="/coffee">
                                        Coffee
                                    </Link>
                                </div>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <div className="navbar__item">
                                    <Link to="/brew-methods">
                                        Brew Methods
                                    </Link>
                                </div>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <div className="navbar__item" >
                                    <a href="/" onClick={handleLogout}>
                                        Logout
                                    </a>
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}