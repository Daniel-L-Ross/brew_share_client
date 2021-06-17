import React from "react"
import { Route } from "react-router-dom"
import { CoffeeProvider } from "./coffee/CoffeeProvider"
import { CoffeeDetail } from "./coffee/CoffeeDetail"
import { CoffeeList } from "./coffee/CoffeeList"
import { EntryDetail } from "./entries/EntryDetail"
import { EntryList } from "./entries/EntryList"
import { EntryProvider } from "./entries/EntryProvider"
import { NavBar } from "./nav/NavBar"


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
    </EntryProvider>

    <CoffeeProvider>
        <Route exact path="/coffees">
            <CoffeeList/>
        </Route>
        
        <Route exact path="/coffees/:coffeeId(\d+)">
            <CoffeeDetail/>
        </Route>
    </CoffeeProvider>

    </>
}