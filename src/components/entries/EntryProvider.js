import React, { createContext, useState } from "react"
import { authApi } from "../auth/authSettings"

export const EntryContext = createContext()

export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])

    const getEntries = () => {
        return fetch(`${authApi.localApiBaseUrl}/entries`)
            .then(res => res.json())
            .then(setEntries)
    }

    return (
        <EntryContext.Provider value={{
            entries, getEntries
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}