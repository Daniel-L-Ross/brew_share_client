import React, { createContext, useState } from "react"
import { apiHeaders, apiSettings } from "../Settings"

export const EntryContext = createContext()

export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])

    const getEntries = () => {
        return fetch(`${apiSettings.baseUrl}/entries`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getSingleEntry = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
    }

    const addEntry = (entryObject) => {
        return fetch(`${apiSettings.baseUrl}/entries`, {
            method: "POST",
            headers:  apiHeaders(),
            body: JSON.stringify(entryObject)
        })
            .then(res => res.json())
    }
    
    const updateEntry = (entryObject) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryObject.id}`, {
            method: "PUT",
            headers:  apiHeaders(),
            body: JSON.stringify(entryObject)
        })
    }
    
    const deleteEntry = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}`, {
            method: "DELETE",
            headers:  apiHeaders()
        })
        .then(getEntries)
    }
    

    const addFavoriteEntry = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}/favorite`, {
            method: "POST",
            headers: apiHeaders()
        })
    }

    const deleteFavoriteEntry = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}/favorite`, {
            method: "DELETE",
            headers: apiHeaders()
        })
    }

    return (
        <EntryContext.Provider value={{
            entries, getEntries, getSingleEntry, addEntry, updateEntry, addFavoriteEntry, deleteFavoriteEntry, deleteEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}