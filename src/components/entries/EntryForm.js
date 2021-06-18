import React, { useContext, useEffect, useState } from "react"
import { EntryContext } from "./EntryProvider"
import { CoffeeContext } from "../coffee/CoffeeProvider"
import { BrewMethodContext } from "../brewMethods/BrewMethodProvider"
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import "../auth/Auth.css"

export const EntryForm = () => {
    const history = useHistory()
    const { addEntry } = useContext(EntryContext)
    const { getCoffees, coffees } = useContext(CoffeeContext)
    const { getBrewMethods, brewMethods } = useContext(BrewMethodContext)

    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        getCoffees()
        getBrewMethods()
    }, [])


    const [entry, setEntry] = useState({
        title: "",
        coffee: 0,
        grindSize: "",
        coffeeAmount: 0,
        method: 0,
        waterTemp: 0,
        waterVolume: 0,
        tastingNotes: "",
        review: "",
        rating: 0,
        setup: "",
        private: false,

    })

    const handleControlledInputChange = (event) => {
            const newEntry = { ...entry }
            newEntry[event.target.id] = event.target.value
            setEntry(newEntry)
    }

    const handleEntrySubmit = (event) => {
        event.preventDefault()
        const newEntry = { ...entry }
        addEntry(newEntry)
        .then(() => history.push("/brew-methods"))
    }

    return (
        <main style={{ textAlign: "center" }}>


            <form className="form--login" onSubmit={handleSubmit(handleEntrySubmit)}>
                <h1 className="h3 mb-3 font-weight-normal">Add New Entry</h1>
                <fieldset>
                    <label htmlFor="title"> Entry Title </label>
                    <input type="text" name="title" id="title" className="form-control" placeholder="Title" {...register("title", {required: "Please add a title to the post"})}  />
                </fieldset>
                <fieldset>
                    <label htmlFor="coffee"> coffee </label>
                    <input type="select" name="coffee" id="coffee" className="form-control" placeholder="coffee"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="grindSize"> grindSize </label>
                    <input type="url" name="grindSize" id="grindSize" className="form-control" placeholder="grindSize"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="coffeeAmount"> coffeeAmount </label>
                    <input type="url" name="coffeeAmount" id="coffeeAmount" className="form-control" placeholder="coffeeAmount"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="method"> Brew Method </label>
                    <input type="file" name="method" id="method" className="form-control"  />
                </fieldset>
                <fieldset>
                    <label htmlFor="waterTemp"> waterTemp </label>
                    <input type="url" name="waterTemp" id="waterTemp" className="form-control" placeholder="waterTemp"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="waterVolume"> waterVolume </label>
                    <input type="url" name="waterVolume" id="waterVolume" className="form-control" placeholder="waterVolume"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="tastingNotes"> tastingNotes </label>
                    <input type="url" name="tastingNotes" id="tastingNotes" className="form-control" placeholder="tastingNotes"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="review"> review </label>
                    <input type="url" name="review" id="review" className="form-control" placeholder="review"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="rating"> rating </label>
                    <input type="url" name="rating" id="rating" className="form-control" placeholder="rating"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="setup"> setup </label>
                    <input type="url" name="setup" id="setup" className="form-control" placeholder="setup"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="private"> private </label>
                    <input type="url" name="private" id="private" className="form-control" placeholder="private"  required />
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