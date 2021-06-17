import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userTokenStorageKey } from "./auth/authSettings"

export const BrewShare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem(userTokenStorageKey)) {
                return <>
                    {/* <NavBar /> */}
                    <ApplicationViews />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem(userTokenStorageKey)) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem(userTokenStorageKey)) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)
