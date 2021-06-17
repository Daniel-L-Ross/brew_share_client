import React, { createContext, useState } from "react"
import { authApi, apiAuthorizationRequest } from "../auth/authSettings"

export const CoffeeContext = createContext()

export const CoffeeProvider = (props) => {
    const [coffees, setCoffees] = useState([])

    const getCoffees = () => {
        return fetch(`${authApi.localApiBaseUrl}/coffees`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
            .then(setCoffees)
    }

    return (
        <CoffeeContext.Provider value={{
            coffees, getCoffees
        }}>
            {props.children}
            </CoffeeContext.Provider>
    )
}