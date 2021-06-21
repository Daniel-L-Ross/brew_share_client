import React, { createContext, useState } from "react"
import { apiHeaders, apiSettings } from "../Settings"

export const CoffeeContext = createContext()

export const CoffeeProvider = (props) => {
    const [coffees, setCoffees] = useState([])

    const getCoffees = () => {
        return fetch(`${apiSettings.baseUrl}/coffees`, {
            headers: apiHeaders()
        })
            .then(res => res.json())
            .then(setCoffees)
    }
    
    const getSingleCoffee = (coffeeId) => {
        return fetch(`${apiSettings.baseUrl}/coffees/${coffeeId}`, {
            headers:  apiHeaders()
        })
            .then(res => res.json())
    }

    const addCoffee = (coffeeObject) => {
        return fetch(`${apiSettings.baseUrl}/coffees`, {
            method: "POST",
            headers:  apiHeaders(),
            body: JSON.stringify(coffeeObject)
        })
            .then(res => res.json())
    }

    return (
        <CoffeeContext.Provider value={{
            coffees, getCoffees, getSingleCoffee, addCoffee
        }}>
            {props.children}
            </CoffeeContext.Provider>
    )
}