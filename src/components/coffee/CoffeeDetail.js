import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CoffeeContext } from "./CoffeeProvider"

export const CoffeeDetail = () => {
    const { getSingleCoffee } = useContext(CoffeeContext)
    const [coffee, setCoffee] = useState({})
    const { coffeeId } = useParams()

    useEffect(() => {
        getSingleCoffee(coffeeId)
            .then(setCoffee)
    }, [])

    return (
        <>
            {
                coffee.id ?
                    <div>
                        <h2>{coffee.roaster} {coffee.name}</h2>
                        <a href={coffee.website}>
                            <img src={coffee.coffee_image}></img>
                        </a>
                        <p>Country: {coffee.country}</p>
                        <p>Region: {coffee.region}</p>
                        <p>Recommended Brew Method: {coffee.recommended_method}</p>
                        <p>Tasting Notes: {coffee.tasting_notes}</p>
                        <p>Process: {coffee.process}</p>
                    </div>
                    : <div></div>
            }
        </>
    )
}