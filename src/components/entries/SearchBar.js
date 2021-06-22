import React, { useContext, useEffect, useState } from "react"
import { CoffeeContext } from "../coffee/CoffeeProvider"
import { BrewMethodContext } from "../brewMethods/BrewMethodProvider"
import { EntryContext } from "./EntryProvider"

export const SearchBar = () => {
    const { getCoffees, coffees } = useContext(CoffeeContext)
    const { getBrewMethods, brewMethods } = useContext(BrewMethodContext)
    const { searchEntries } = useContext(EntryContext)

    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        coffee: 0,
        method: 0
    })

    useEffect(() => {
        getCoffees()
        getBrewMethods()

    }, [])

    const updateSearch = () => {
        let queryParams = "?"
        if (searchTerm.length) {
            queryParams += `${searchTerm}`
        }
        console.log(queryParams)
    }

    //TODO: handle base url here

    const clearSearch = () => {
        setSearchTerm("")
        setFilters({
            coffee: 0,
            method: 0
        })
        
    }

    const handleInputChange = ( event ) => {
        if(event.target.id === "searchTerm"){
            const newTerm = event.target.value
            setSearchTerm(newTerm)
        } else {
            const newFilters = { ...filters }
            newFilters[event.target.id] = parseInt(event.target.value)
            setFilters(newFilters)
        }
    }

    return (
        <>
            <p>SEARCH: </p>
            <input className="" type="text" id="searchTerm" placeholder="Search posts..." value={searchTerm} onChange={handleInputChange}/>
            <label htmlFor="coffee"> Coffee </label>
            <select className="" id="coffee" value={ filters.coffee } onChange={handleInputChange}>
                <option value="">Filter by Coffee</option>
                {
                    coffees.map(coffee => {
                        return <option value={coffee.id} key={`coffee--${coffee.id}`}>{coffee.roaster} {coffee.name}</option>
                    })
                }
            </select>
            <label htmlFor="method"> Brew Method </label>
            <select className="" id="method" value={ filters.method } onChange={handleInputChange}>
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