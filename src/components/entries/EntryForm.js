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
    const { addEntry, getSingleEntry, updateEntry } = useContext(EntryContext)
    const { getCoffees, coffees } = useContext(CoffeeContext)
    const { getBrewMethods, brewMethods } = useContext(BrewMethodContext)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const { entryId } = useParams()
    const [entry, setEntry] = useState({})

    // boolean to determine if form is in edit or add state
    const addMode = !entryId

    useEffect(() => {
        getCoffees()
        getBrewMethods()
        if (!addMode) {
            getSingleEntry(parseInt(entryId))
                .then(setEntry)
        }
    }, [])

    // if an entryId is present, when the value of the entry is set, 
    // update the react-hook-form values
    useEffect(() => {
        setValue("title", entry.title)
        setValue("coffee", entry.coffee?.id)
        setValue("grindSize", entry.grind_size)
        setValue("coffeeAmount", entry.coffee_amount)
        setValue("method", entry.method?.id)
        setValue("waterTemp", entry.water_temp)
        setValue("waterVolume", entry.water_volume)
        setValue("tastingNotes", entry.tasting_notes)
        setValue("rating", entry.rating)
        setValue("review", entry.review)
        setValue("setup", entry.setup)
        if (entry.private === "true") {
            setValue("private", 1)
        } else {
            setValue("private", 0)
        }
    }, [entry])


    const handleEntrySubmit = (entryObject) => {
        if (addMode) {
            addEntry(entryObject)
                .then(entryObject => {
                    entryObject.id ?
                        history.push(`/entries/${entryObject.id}/detail`)
                        : alert("something went wrong...")
                })
        } else {
            entryObject.id = entry.id
            updateEntry(entryObject)
                .then(response => {

                    response.ok ?
                        history.push(`/entries/${entry.id}/detail`)
                        : console.log(response)
                })
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <form className="form--login" onSubmit={handleSubmit(handleEntrySubmit)}>
                <h1 className="h3 mb-3 font-weight-normal">{addMode ? "Add New Entry" : "Edit Entry"}</h1>
                <fieldset>
                    <label htmlFor="title"> Entry Title </label>
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                    <input type="text" className="form-control" placeholder="Title"
                        {...register("title", { required: "Please add a title to your entry", maxLength: 50 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="coffee"> Coffee </label>
                    {errors.coffee && <p className="error-message">{errors.coffee.message}</p>}
                    <select className="form-control"
                        {...register("coffee", { required: "Please select a coffee" })} >
                        <option value="">Please select a coffee</option>
                        {
                            coffees.map(coffee => {
                                return <option value={coffee.id} key={`coffee--${coffee.id}`}>{coffee.roaster} {coffee.name}</option>
                            })
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="grindSize"> Grind Size </label>
                    {errors.grindSize && <p className="error-message">{errors.grindSize.message}</p>}
                    <input type="text" className="form-control" placeholder="grind size..."
                        {...register("grindSize", { required: "Please provide the grind size used", maxLength: 25 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="coffeeAmount"> Grams coffee </label>
                    {errors.coffeeAmount && <p className="error-message">{errors.coffeeAmount.message}</p>}
                    <input type="number" className="form-control" placeholder="Enter a number..."
                        {...register("coffeeAmount", { required: "Please add the amount of coffee used" })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="method"> Brew Method </label>
                    {errors.method && <p className="error-message">{errors.method.message}</p>}
                    <select className="form-control"
                        {...register("method", { required: "Please select a brewing method" })} >
                        <option value="">Please select a Brewing Method</option>
                        {
                            brewMethods.map(method => {
                                return <option value={method.id} key={`method--${method.id}`}>{method.name}</option>
                            })
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="waterTemp"> Water temp (fahrenheit) </label>
                    {errors.waterTemp && <p className="error-message">{errors.waterTemp.message}</p>}
                    <input type="number" className="form-control" placeholder="Enter a number..."
                        {...register("waterTemp", { required: "Please provide the water temp used", max: 212 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="waterVolume"> Water volume (grams) </label>
                    {errors.waterVolume && <p className="error-message">{errors.waterVolume.message}</p>}
                    <input type="number" className="form-control" placeholder="Enter a number..."
                        {...register("waterVolume", { required: "Please provide the amount of water used" })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="tastingNotes"> Tasting Notes </label>
                    <input type="text" className="form-control" placeholder="Tasting notes (optional)"
                        {...register("tastingNotes", { maxLength: 50 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="review"> Review your brew  </label>
                    <textarea type="text" className="form-control" placeholder="Your review (optional)"
                        {...register("review", { maxLength: 255 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="rating"> Rating (1-5) </label>
                    {errors.rating && <p className="error-message">{errors.rating.message}</p>}
                    <input type="number" className="form-control"
                        {...register("rating", { required: "Please rate your entry", min: 1, max: 5 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="setup"> Setup notes </label>
                    {errors.setup && <p className="error-message">{errors.setup.message}</p>}
                    <textarea type="text" className="form-control" placeholder="Ex: Rinse filter and dispose of water. "
                        {...register("setup", { required: "Please add setup notes", maxLength: 255 })} />
                </fieldset>

                <fieldset>
                    <label htmlFor="private"> Privacy </label>
                    <select className="form-control"
                        {...register("private")} >
                        <option value={0}>Public</option>
                        <option value={1}>Private</option>
                    </select>
                </fieldset>

                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">{addMode ? "Save Entry" : "Update Entry"}</button>
                </fieldset>
            </form>

        </main>
    )
}