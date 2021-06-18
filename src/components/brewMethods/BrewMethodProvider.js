import React, { createContext, useState } from "react"
import { authApi, apiAuthorizationRequest } from "../auth/authSettings"

export const BrewMethodContext = createContext()

export const BrewMethodProvider = (props) => {
    const [brewMethods, setBrewMethods] = useState([])

    const getBrewMethods = () => {
        return fetch(`${authApi.localApiBaseUrl}/methods`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
            .then(setBrewMethods)
    }
    
    const getSingleBrewMethod = (brewMethodId) => {
        return fetch(`${authApi.localApiBaseUrl}/methods/${brewMethodId}`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
    }

    const addBrewMethod = (brewMethodObject) => {
        return fetch(`${authApi.localApiBaseUrl}/methods`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${apiAuthorizationRequest}`
            },
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