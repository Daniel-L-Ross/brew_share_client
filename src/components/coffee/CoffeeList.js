import React, { useContext, useEffect, useState } from "react"
import { Link, userHistory, useParams } from "react-router-dom"
import { CoffeeContext } from "./CoffeeProvider"

export const CoffeeList = () => {
    const { coffees, getCoffees } = useContext(CoffeeContext)

    useEffect(() => {
        getCoffees()
    }, [])

    return (
        <>
            <h2>Coffee List</h2>
            {
                coffees.map(coffee => {
                    return <div key={`coffee--${coffee.id}`}>
                        <Link to={`/coffees/${coffee.id}`}>
                            <h3>{coffee.roaster} {coffee.name}</h3>
                        </Link>

                    </div>
                })
            }
        </>
    )
}