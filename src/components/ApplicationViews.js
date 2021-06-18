import React from "react"
import { Route } from "react-router-dom"
import { CoffeeProvider } from "./coffee/CoffeeProvider"
import { CoffeeDetail } from "./coffee/CoffeeDetail"
import { CoffeeList } from "./coffee/CoffeeList"
import { CoffeeForm } from "./coffee/CoffeeForm"
import { EntryDetail } from "./entries/EntryDetail"
import { EntryList } from "./entries/EntryList"
import { EntryProvider } from "./entries/EntryProvider"
import { NavBar } from "./nav/NavBar"
import { BrewMethodProvider } from "./brewMethods/BrewMethodProvider"
import { BrewMethodList } from "./brewMethods/BrewMethodList"
import { BrewMethodForm } from "./brewMethods/BrewMethodForm"
import { EntryForm } from "./entries/EntryForm"


export const ApplicationViews = () => {
    return <>

        <NavBar />

        <EntryProvider>
            <Route exact path="/">
                <EntryList />
            </Route>

            <Route path="/entries/:entryId(\d+)">
                <EntryDetail />
            </Route>

            <CoffeeProvider>
                <BrewMethodProvider>

                    <Route path="/entries/create">
                        <EntryForm />
                    </Route>
                    
                </BrewMethodProvider>
            </CoffeeProvider>
        </EntryProvider>

        <CoffeeProvider>
            <Route exact path="/coffee">
                <CoffeeList />
            </Route>

            <Route exact path="/coffee/:coffeeId(\d+)/detail">
                <CoffeeDetail />
            </Route>

            <Route exact path="/coffee/add">
                <CoffeeForm />
            </Route>
        </CoffeeProvider>

        <BrewMethodProvider>
            <Route exact path="/brew-methods">
                <BrewMethodList />
            </Route>

            <Route path="/brew-methods/add">
                <BrewMethodForm />
            </Route>

        </BrewMethodProvider>

    </>
}