import React, { useContext, useEffect, useState } from "react"
import { CoffeeContext } from "./CoffeeProvider"
import { useHistory, useParams } from 'react-router-dom'
import { createImageString } from "../ImageUploadHandler"
import "../auth/Auth.css"

export const CoffeeForm = () => {
    const [coffee, setCoffee] = useState({

    })

    const updateImageString = (event) => {

    }

    const handleCoffeeSubmit = () => {
        console.log("Form submitted")
    }



    return (
        <main style={{ textAlign: "center" }}>


            <form className="form--login" onSubmit={handleCoffeeSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input type="bio" name="bio" className="form-control" placeholder="Bio" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="currentCoffee"> Current Coffee </label>
                    <input type="currentCoffee" name="currentCoffee" className="form-control" placeholder="Current coffee" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="currentBrewMethod"> Current Brewing Method </label>
                    <input type="currentBrewMethod" name="currentBrewMethod" className="form-control" placeholder="Brew method" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="profileImage"> Profile Image </label>
                    <input type="file" name="profileImage" className="form-control" onChange={updateImageString} />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input type="password" name="password" className="form-control" placeholder="Password" required />
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