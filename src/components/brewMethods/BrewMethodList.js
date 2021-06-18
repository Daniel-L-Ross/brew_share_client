import React, { useContext, useEffect, useState } from "react"
import { Link, userHistory, useParams, useHistory } from "react-router-dom"
import { BrewMethodContext } from "./BrewMethodProvider"

export const BrewMethodList = () => {
    const { brewMethods, getBrewMethods } = useContext(BrewMethodContext)
    const history = useHistory()
    useEffect(() => {
        getBrewMethods()
    }, [])

    return (
        <>
            <h2>Brew Method List</h2>
            <button onClick={()=> history.push("/brew-methods/add")}> Add New Coffee </button>
            {
                brewMethods.map(method => {
                    return <div key={`brewMethod--${method.id}`}>
                        <Link to={`/brew-method/${method.id}/detail`}>
                            <h3>{method.name} {coffee.name}</h3>
                        </Link>

                    </div>
                })
            }
        </>
    )
}