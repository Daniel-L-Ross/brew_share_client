import React, { useContext, useEffect, useState } from "react"
import { BrewMethodContext } from "./BrewMethodProvider"
import { useHistory, useParams } from 'react-router-dom'
import { createImageString } from "../ImageUploadHandler"
import "../auth/Auth.css"

export const BrewMethodForm = () => {
    const history = useHistory()
    const { addBrewMethod } = useContext(BrewMethodContext)
    const [brewMethodImage, setBrewMethodImage] = useState(""
    )

    const [brewMethod, setBrewMethod] = useState({
        name: "",
        website: "",
    })

    const handleControlledInputChange = (event) => {
        if (event.target.id === "brewMethodImage") {
            createImageString(event.target.files[0], setBrewMethodImage)
        } else {
            const newBrewMethod = { ...brewMethod }
            newBrewMethod[event.target.id] = event.target.value
            setBrewMethod(newBrewMethod)
        }
    }

    const handleBrewMethodSubmit = (event) => {
        event.preventDefault()
        const newBrewMethod = { ...brewMethod }
        newBrewMethod.brewMethodImage = brewMethodImage
        addBrewMethod(newBrewMethod)
        .then(() => history.push("/brew-methods"))
    }

    return (
        <main style={{ textAlign: "center" }}>


            <form className="form--login" onSubmit={handleBrewMethodSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add a New Brew Method</h1>
                <fieldset>
                    <label htmlFor="name"> Product Name </label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="website"> Website </label>
                    <input type="url" name="website" id="website" className="form-control" placeholder="Website/Link" onChange={handleControlledInputChange} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="brewMethodImage"> Coffee Image (optional) </label>
                    <input type="file" name="brewMethodImage" id="brewMethodImage" className="form-control" onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Add Brew Method</button>
                </fieldset>
            </form>

        </main>
    )
}