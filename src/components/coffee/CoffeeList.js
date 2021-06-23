import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { CoffeeContext } from "./CoffeeProvider"

export const CoffeeList = () => {
    const { coffees, getCoffees } = useContext(CoffeeContext)
    const history = useHistory()
    useEffect(() => {
        getCoffees()
    }, [])

    return (
        <>
            <h2>Coffee List</h2>
            <button onClick={()=> history.push("/coffee/add")}> Add New Coffee </button>
            {
                coffees.map(coffee => {
                    return <div key={`coffee--${coffee.id}`}>
                        <Link to={`/coffee/${coffee.id}/detail`}>
                            <h3>{coffee.roaster} {coffee.name}</h3>
                        </Link>

                    </div>
                })
            }
        </>
    )
}