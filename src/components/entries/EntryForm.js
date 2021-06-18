import React, { useContext, useEffect, useState } from "react"
import { EntryContext } from "./EntryProvider"
import { CoffeeContext } from "../coffee/CoffeeProvider"
import { BrewMethodContext } from "../brewMethods/BrewMethodProvider"
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import "../auth/Auth.css"
import "./Entry.css"

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
                    <input type="text" className="form-control" placeholder="Title" {...register("title", {required: true, maxLength: 50})}  />
                </fieldset>

                <fieldset>
                    <label htmlFor="coffee"> Coffee </label>
                    <select className="form-control" {...register("coffee", {required: true})} >
                        <option value={0}>Please select a coffee</option>
                        {
                            coffees.map(coffee => {
                                return <option value={coffee.id}>{coffee.roaster} {coffee.name}</option>
                            })
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="grindSize"> Grind Size </label>
                    <input type="text" className="form-control" placeholder="medium-fine" {...register("grindSize", {required: true, maxLength: 25})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="coffeeAmount"> Grams coffee </label>
                    <input type="number" className="form-control" placeholder="Enter a number..." {...register("coffeeAmount", {required: true})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="method"> Brew Method </label>
                    <select className="form-control" {...register("method", {required: true})} >
                        <option value={0}>Please select a Brewing Method</option>
                        {
                            brewMethods.map(method => {
                                return <option value={method.id}>{method.name}</option>
                            })
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="waterTemp"> Water temp (fahrenheit) </label>
                    <input type="number" className="form-control" placeholder="Enter a number..." {...register("waterTemp", {required:true, max:212})}/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="waterVolume"> Water volume (grams) </label>
                    <input type="number" className="form-control" placeholder="Enter a number..." {...register("waterVolume", {required:true})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="tastingNotes"> Tasting Notes </label>
                    <input type="text" className="form-control" placeholder="Tasting notes (optional)" {...register("TastingNotes", {maxLength: 50})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="review"> Review your brew  </label>
                    <textarea type="text" className="form-control" placeholder="Your review (optional)" {...register("review", {maxLength: 255})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="rating"> Rating (1-5) </label>
                    <input type="number" className="form-control"  {...register("rating", { min: 1, max:5 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="setup"> Setup notes </label>
                    <textarea type="text" className="form-control" placeholder="Ex: Rinse filter and dispose of water. " {...register("setup", {required: true, maxLength: 255})}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="private"> Privacy </label>
                    <select className="form-control"  {...register("private")} >
                        <option value={false}>Public</option>
                        <option value={true}>Private</option>
                    </select>
                </fieldset>

                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Save Entry</button>
                </fieldset>
            </form>

        </main>
    )
}