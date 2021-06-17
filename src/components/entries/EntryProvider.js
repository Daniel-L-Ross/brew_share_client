import React, { createContext, useState } from "react"
import { authApi, apiAuthorizationRequest } from "../auth/authSettings"

export const EntryContext = createContext()

export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])

    const getEntries = () => {
        return fetch(`${authApi.localApiBaseUrl}/entries`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getSingleEntry = (entryId) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryId}`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
    }


    return (
        <EntryContext.Provider value={{
            entries, getEntries, getSingleEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}