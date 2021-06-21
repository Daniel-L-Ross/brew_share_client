import React, { createContext, useState } from "react"
import { apiHeaders, apiSettings } from "../Settings"

export const BrewMethodContext = createContext()

export const BrewMethodProvider = (props) => {
    const [brewMethods, setBrewMethods] = useState([])

    const getBrewMethods = () => {
        return fetch(`${apiSettings.baseUrl}/methods`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
            .then(setBrewMethods)
    }
    
    const getSingleBrewMethod = (brewMethodId) => {
        return fetch(`${apiSettings.baseUrl}/methods/${brewMethodId}`, {
            headers:  apiHeaders()
        })
            .then(res => res.json())
    }

    const addBrewMethod = (brewMethodObject) => {
        return fetch(`${apiSettings.baseUrl}/methods`, {
            method: "POST",
            headers:  apiHeaders(),
            body: JSON.stringify(brewMethodObject)
        })
            .then(res => res.json())
    }

    return (
        <BrewMethodContext.Provider value={{
            brewMethods, getBrewMethods, getSingleBrewMethod, addBrewMethod
        }}>
            {props.children}
            </BrewMethodContext.Provider>
    )
}