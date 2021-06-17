import React from "react"
import { Route } from "react-router-dom"
import { EntryDetail } from "./entries/EntryDetail"
import { EntryList } from "./entries/EntryList"
import { EntryProvider } from "./entries/EntryProvider"


export const ApplicationViews = () => {
    return <>

    <h1>Navbar renders here</h1>
    <EntryProvider>
        <Route exact path="/">
            <EntryList />
        </Route>

        <Route path="/entries/:entryId(\d+)">
            <EntryDetail />
        </Route>
    </EntryProvider>
    </>
}