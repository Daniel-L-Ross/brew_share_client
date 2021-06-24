import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
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
            <button onClick={() => history.push("/brew-methods/add")}> Add Brew Method </button>
            {
                brewMethods.map(method => {
                    return <div key={`brewMethod--${method.id}`}>
                        <h3>{method.name}</h3>
                        <a href={method.website}>
                            <img style={{ maxWidth: `15em` }} src={method.method_image} alt={method.name}></img>
                        </a>
                    </div>
                })
            }
        </>
    )
}