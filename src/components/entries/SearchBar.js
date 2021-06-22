import React, { useContext, useEffect, useState } from "react"
import { CoffeeContext } from "../coffee/CoffeeProvider"
import { BrewMethodContext } from "../brewMethods/BrewMethodProvider"

export const SearchBar = () => {
    const { getCoffees, coffees } = useContext(CoffeeContext)
    const { getBrewMethods, brewMethods } = useContext(BrewMethodContext)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getCoffees()
        getBrewMethods()

    }, [])

    const updateSearch = () => {

    }

    const clearSearch = () => {

    }
    return (
        <>
            <p>SEARCH: </p>
            <input className="" type="text" placeholder="Search posts..." value={searchTerm}/>
            <label htmlFor="coffee"> Coffee </label>
            <select className="">
                <option value="">Filter by Coffee</option>
                {
                    coffees.map(coffee => {
                        return <option value={coffee.id} key={`coffee--${coffee.id}`}>{coffee.roaster} {coffee.name}</option>
                    })
                }
            </select>
            <label htmlFor="method"> Brew Method </label>
            <select className="">
                <option value="">Filter by Brewing Method</option>
                {
                    brewMethods.map(method => {
                        return <option value={method.id} key={`method--${method.id}`}>{method.name}</option>
                    })
                }
            </select>
            <button onClick={updateSearch}>Update Search</button>
            <button onClick={clearSearch}>Clear Search</button>
        </>
    )
}