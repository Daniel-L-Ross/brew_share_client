import React, { useContext, useEffect, useState } from "react"
import { CoffeeContext } from "./CoffeeProvider"
import { useHistory, useParams } from 'react-router-dom'
import { createImageString } from "../ImageUploadHandler"
import "../auth/Auth.css"

export const CoffeeForm = () => {
    const history = useHistory()
    const { addCoffee } = useContext(CoffeeContext)
    const [coffeeImage, setCoffeeImage] = useState(""
    )

    const [coffee, setCoffee] = useState({
        roaster: "",
        name: "",
        website: "",
        country: "",
        region: "",
        process: "",
        recommendedMethod: "",
        tastingNotes: "",
    })

    const handleControlledInputChange = (event) => {
        if (event.target.id === "coffeeImage") {
            createImageString(event.target.files[0], setCoffeeImage)
        } else {
            const newCoffee = { ...coffee }
            newCoffee[event.target.id] = event.target.value
            setCoffee(newCoffee)
        }
    }

    const handleCoffeeSubmit = (event) => {
        event.preventDefault()
        const newCoffee = { ...coffee }
        newCoffee.coffeeImage = coffeeImage
        addCoffee(newCoffee)
        .then(new_coffee => history.push(`/coffee/${new_coffee.id}/detail`))
    }

    return (
        <main style={{ textAlign: "center" }}>


            <form className="form--login" onSubmit={handleCoffeeSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add a New Coffee</h1>
                <fieldset>
                    <label htmlFor="roaster"> Roaster </label>
                    <input type="text" name="roaster" id="roaster" className="form-control" placeholder="Roaster" onChange={handleControlledInputChange} required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="website"> Website </label>
                    <input type="url" name="website" id="website" className="form-control" placeholder="Website/Link" onChange={handleControlledInputChange} required />
                </fieldset>

                <fieldset>
                    <label htmlFor="country"> Country </label>
                    <input type="text" name="country" id="country" className="form-control" placeholder="Country" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="region"> Region </label>
                    <input type="text" name="region" id="region" className="form-control" placeholder="Region" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="process"> Process </label>
                    <input type="text" name="process" id="process" className="form-control" placeholder="Process" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="recommendedMethod"> Recommended Brewing Method(s) </label>
                    <input type="text" name="recommendedMethod" id="recommendedMethod" className="form-control" placeholder="Brew Method" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="tastingNotes"> Tasting Notes </label>
                    <input type="text" name="tastingNotes" id="tastingNotes" className="form-control" placeholder="Tasting Notes" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="coffeeImage"> Coffee Image (optional) </label>
                    <input type="file" name="coffeeImage" id="coffeeImage" className="form-control" onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Add Coffee</button>
                </fieldset>
            </form>

        </main>
    )
}