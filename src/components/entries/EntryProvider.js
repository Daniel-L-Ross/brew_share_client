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

    const addEntry = (entryObject) => {
        return fetch(`${authApi.localApiBaseUrl}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            },
            body: JSON.stringify(entryObject)
        })
            .then(res => res.json())
    }
    
    const updateEntry = (entryObject) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            },
            body: JSON.stringify(entryObject)
        })
    }
    
    const deleteEntry = (entryId) => {
        return fetch(`${authApi.localApiBaseUrl}/entries/${entryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
        .then(getEntries)
    }
    

    return (
        <EntryContext.Provider value={{
            entries, getEntries, getSingleEntry, addEntry, updateEntry, deleteEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}