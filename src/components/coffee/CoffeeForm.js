import React, { useContext, useEffect, useState } from "react"
import { CoffeeContext } from "./CoffeeProvider"
import { useHistory, useParams } from 'react-router-dom'
import { createImageString } from "../ImageUploadHandler"
import "../auth/Auth.css"

export const CoffeeForm = () => {
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

    const handleCoffeeSubmit = () => {
        console.log("Form submitted")
    }



    return (
        <main style={{ textAlign: "center" }}>


            <form className="form--login" onSubmit={handleCoffeeSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add a New Coffee</h1>
                <fieldset>
                    <label htmlFor="roaster"> Roaster </label>
                    <input type="text" name="roaster" id="roaster" className="form-control" placeholder="Roaster" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="website"> Website </label>
                    <input type="url" name="website" id="website" className="form-control" placeholder="Website/Link" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="country"> Country </label>
                    <input type="text" name="country" className="form-control" placeholder="Xountry" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="region"> Region </label>
                    <input type="text" name="region" className="form-control" placeholder="Region" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="process"> Process </label>
                    <input type="text" name="process" className="form-control" placeholder="Process" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="recommendedMethod"> Recommended Brewing Method(s) </label>
                    <input type="text" name="recommendedMethod" className="form-control" placeholder="Brew Method" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="tastingNotes"> Tasting Notes </label>
                    <input type="text" name="tastingNotes" className="form-control" placeholder="Tasting Notes" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="coffeeImage"> Coffee Image (optional) </label>
                    <input type="file" id="coffeeImage" name="coffeeImage" className="form-control" onChange={handleControlledInputChange} />
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