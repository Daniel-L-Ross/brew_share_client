import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userTokenStorageKey } from "./auth/authSettings"
import { IonReactRouter } from "@ionic/react-router"
import { IonApp, IonRouterOutlet } from "@ionic/react"

export const BrewShare = () => (
    <>
        <IonApp >


            <IonReactRouter >
                <IonRouterOutlet >
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
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    </>
)
