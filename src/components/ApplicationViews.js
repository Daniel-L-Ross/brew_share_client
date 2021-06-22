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
import { StepForm } from "./entries/StepForm"


export const ApplicationViews = () => {
    return <>

        <NavBar />

        <EntryProvider>
            <Route exact path="/">
                <EntryList />
            </Route>
            <Route path="/:username/favorites">
                <EntryList />
            </Route>
            <Route path="/:username/my-entries">
                <EntryList />
            </Route>

            <Route exact path="/entries/:entryId(\d+)/detail">
                <EntryDetail />
            </Route>

            <Route exact path="/entries/:entryId(\d+)/steps/add">
                <StepForm />
            </Route>

            <Route path="/entries/:entryId(\d+)/steps/:stepId(\d+)/edit">
                <StepForm />
            </Route>

            <CoffeeProvider>
                <BrewMethodProvider>

                    <Route path="/entries/create">
                        <EntryForm />
                    </Route>

                    <Route path="/entries/:entryId(\d+)/edit">
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