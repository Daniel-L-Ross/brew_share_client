import React from "react"
import { Route } from "react-router-dom"
import { EntryList } from "./entries/EntryList"
import { EntryProvider } from "./entries/EntryProvider"


export const ApplicationViews = () => {
    return <>

    <h1>Hello world</h1>
    <EntryProvider>
        <Route exact path="/">
            <EntryList />
        </Route>
    </EntryProvider>
    </>
}