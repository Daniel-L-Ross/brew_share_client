import React, { useContext, useEffect, useState } from "react"
import { EntryContext } from "./EntryProvider"
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { EntrySteps } from "./EntrySteps"
import { createImageString } from "../ImageUploadHandler"
import "../auth/Auth.css"
import "./Entry.css"

export const StepForm = () => {
    const history = useHistory()
    const { getSingleEntry } = useContext(EntryContext)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const { entryId } = useParams()
    const { stepId } = useParams()

    const [entry, setEntry] = useState({})
    const [step, setStep] = useState({})
    const [imageString, setImageString] = useState('')

    // boolean to determine if form is in edit or add state
    const addMode = !stepId

    useEffect(() => {
        getSingleEntry(parseInt(entryId))
            .then(setEntry)
    }, [])

    // if an entryId is present, when the value of the entry is set, 
    // update the react-hook-form values
    useEffect(() => {
        if (entry.edit_allowed === false) {
            history.push(`/entries/${entry.id}/detail`)
        }

        // setValue("title", entry.title)
        // setValue("coffee", entry.coffee?.id)
        // setValue("descriptor", entry.descriptor)
        // setValue("coffeeAmount", entry.coffee_amount)

    }, [entry])


    const handleStepSubmit = (stepObject) => {
        if (addMode) {
            // addEntry(entryObject)
            //     .then(entryObject => {
            //         entryObject.id ?
            //             history.push(`/entries/${entryObject.id}/detail`)
            //             : alert("something went wrong...")
            //     })
        } else {
            // entryObject.id = entry.id
            // updateEntry(entryObject)
            //     .then(response => {

            //         response.ok ?
            //             history.push(`/entries/${entry.id}/detail`)
            //             : alert("something went wrong...")
            //     })
        }
    }

    return (
        <>
            <EntrySteps steps={entry.steps} />

            <main style={{ textAlign: "center" }}>

                <form className="form--login" onSubmit={handleSubmit(handleStepSubmit)}>
                    <h1 className="h3 mb-3 font-weight-normal">{addMode ? "Add New Step" : "Edit Step"}</h1>
                    <fieldset>
                        <label htmlFor="stepImage"> Step image (optional)</label>
                        <input type="file" className="form-control"
                            {...register("stepImage")} />
                    </fieldset>


                    <fieldset>
                        <label htmlFor="descriptor"> Descriptor </label>
                        {errors.descriptor && <p className="error-message">{errors.descriptor.message}</p>}
                        <input type="text" className="form-control" placeholder="ex: STIR"
                            {...register("descriptor", { required: "Please provide a single word descriptor of the action step", maxLength: 25 })} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="instruction"> Instruction </label>
                        {errors.instruction && <p className="error-message">{errors.instruction.message}</p>}
                        <input type="text" className="form-control" placeholder="the grounds 10 times gently"
                            {...register("instruction", { required: "Enter a brief description of how to complete this step" })} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="seconds"> Seconds </label>
                        {errors.seconds && <p className="error-message">{errors.seconds.message}</p>}
                        <input type="number" className="form-control" placeholder="Enter a the time (in seconds) when this step occurs"
                            {...register("seconds", { required: "Please provide the water temp used"})} />
                    </fieldset>

                    

                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">{addMode ? "Save Step" : "Update Step"}</button>
                    </fieldset>
                </form>

            </main>
        </>
    )
}