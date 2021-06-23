import React, { useContext, useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { CoffeeContext } from "../coffee/CoffeeProvider"
import { BrewMethodContext } from "../brewMethods/BrewMethodProvider"
import { EntryContext } from "./EntryProvider"

export const SearchBar = () => {
    const { getCoffees, coffees } = useContext(CoffeeContext)
    const { getBrewMethods, brewMethods } = useContext(BrewMethodContext)
    const { getEntries } = useContext(EntryContext)

    const [searchTerm, setSearchTerm] = useState("")

    // manage state variable of current search filters
    const [filters, setFilters] = useState({
        coffee: 0,
        method: 0
    })

    const location = useLocation()
    const { username } = useParams()
    
    // determine the base url based on the route and params
    const baseSearchUrl = () => {
        if (username && location.pathname.includes("favorites")) {
            return "?favorite=True"
        } else if (username && location.pathname.includes("my-entries")) {
            return `?username=${username}`
        } else {
            return ""
        }
    }

    // get data for rendering search options and for current entries to be displayed
    useEffect(() => {
        getCoffees()
        getBrewMethods()
        getEntries(baseSearchUrl())
    }, [])

    // build custom query params string to append to fetch call
    const updateSearch = () => {
        let queryParams = ""
        const oneParamExists = (queryParams.includes("?") || baseSearchUrl().includes("?"))
        if (searchTerm.length) {
            oneParamExists ? queryParams += `&searchterm=${searchTerm}` 
            : queryParams += `?searchterm=${searchTerm}`
        }
        if (filters.coffee > 0){
            oneParamExists ? queryParams += `&coffee=${filters.coffee}` 
            : queryParams += `?coffee=${filters.coffee}`
        }
        if (filters.method > 0){
            oneParamExists ? queryParams += `&method=${filters.method}` 
            : queryParams += `?method=${filters.method}`
        }
        const searchUrl = baseSearchUrl() + queryParams
        getEntries(searchUrl)
    }

    const clearSearch = () => {
        setSearchTerm("")
        setFilters({
            coffee: 0,
            method: 0
        })
        getEntries(baseSearchUrl())
    }

    const handleInputChange = (event) => {
        if (event.target.id === "searchTerm") {
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
            <input className="" type="text" id="searchTerm" placeholder="Search posts..." value={searchTerm} onChange={handleInputChange} />
            <label htmlFor="coffee"> Coffee </label>
            <select className="" id="coffee" value={filters.coffee} onChange={handleInputChange}>
                <option value={0}>Filter by Coffee</option>
                {
                    coffees.map(coffee => {
                        return <option value={coffee.id} key={`coffee--${coffee.id}`}>{coffee.roaster} {coffee.name}</option>
                    })
                }
            </select>
            <label htmlFor="method"> Brew Method </label>
            <select className="" id="method" value={filters.method} onChange={handleInputChange}>
                <option value={0}>Filter by Brewing Method</option>
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