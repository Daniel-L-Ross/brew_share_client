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
    
    const getSingleCoffee = (coffeeId) => {
        return fetch(`${authApi.localApiBaseUrl}/coffees/${coffeeId}`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
    }

    const addCoffee = (coffeeObject) => {
        return fetch(`${authApi.localApiBaseUrl}/coffees`, {
            headers: {
                "Authorization": `Token ${apiAuthorizationRequest}`
            }
        })
            .then(res => res.json())
    }

    return (
        <CoffeeContext.Provider value={{
            coffees, getCoffees, getSingleCoffee
        }}>
            {props.children}
            </CoffeeContext.Provider>
    )
}