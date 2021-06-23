import React, { createContext, useState } from "react"
import { apiHeaders, apiSettings } from "../Settings"

export const EntryContext = createContext()

export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])
    const [entry, setEntry] = useState({})

    const getEntries = (queryParams) => {
        return fetch(`${apiSettings.baseUrl}/entries${queryParams}`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getFavoriteEntries = (username) => {
        return fetch(`${apiSettings.baseUrl}/entries/favorites`, {
            method: "POST",
            headers: apiHeaders(),
            body:JSON.stringify({"username": username})
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getSingleEntry = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
            .then(setEntry)
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

    const togglePrivacy = (entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}/private`, {
            method: "POST",
            headers: apiHeaders()
        })
    }

    const addStep = (stepObject) => {
        return fetch(`${apiSettings.baseUrl}/entries/${stepObject.entryId}/steps`, {
            method: "POST",
            headers:  apiHeaders(),
            body: JSON.stringify(stepObject)
        })
    }

    const updateStep = (stepObject) => {
        return fetch(`${apiSettings.baseUrl}/entries/${stepObject.entryId}/steps`, {
            method: "PUT",
            headers:  apiHeaders(),
            body: JSON.stringify(stepObject)
        })
    }

    const deleteStep = (stepId, entryId) => {
        return fetch(`${apiSettings.baseUrl}/entries/${entryId}/steps`, {
            method: "DELETE",
            headers:  apiHeaders(),
            body: JSON.stringify({"id": stepId})
        })
    }

    return (
        <EntryContext.Provider value={{
            entries, entry, getEntries, getSingleEntry, addEntry, updateEntry, addFavoriteEntry, deleteFavoriteEntry, 
            deleteEntry, getFavoriteEntries, togglePrivacy, addStep, updateStep, deleteStep, setEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}