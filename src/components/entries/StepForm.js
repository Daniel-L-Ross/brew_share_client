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
    const { getSingleEntry, addStep, updateStep } = useContext(EntryContext)

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
            // .then(entry => {
            //     setEntry(entry)
            //     if (stepId) {
            //         const step = entry.steps.find(step => step.id === parseInt(stepId))

            //         setStep(step)
            //     }
            // }

            // )
    }, [])

    // if an entryId is present, when the value of the entry is set, 
    // update the react-hook-form values
    useEffect(() => {
        if (entry.edit_allowed === false) {
            history.push(`/entries/${entry.id}/detail`)
        } else {
            setValue("descriptor", step.descriptor)
            setValue("instruction", step.instruction)
            setValue("seconds", step.seconds)
        }

    }, [step])

    const updateImageString = (event) => {
        createImageString(event.target.files[0], setImageString)
    }

    const handleStepSubmit = (stepObject) => {
        stepObject.entryId = entryId
        if (addMode) {
            addStep(stepObject)
                .then(() => history.push(`entries/${entryId}/detail`))
        } else {
            stepObject.id = stepId
            updateStep(stepObject)
                .then(response => {
                    response.ok ?
                        history.push(`/entries/${entryId}/detail`)
                        : alert("something went wrong...")
                })
        }
    }

    return (
        <>
            <EntrySteps entry={entry} />

            <main style={{ textAlign: "center" }}>

                <form className="form--login" onSubmit={handleSubmit(handleStepSubmit)}>
                    <h1 className="h3 mb-3 font-weight-normal">{addMode ? "Add New Step" : "Edit Step"}</h1>
                    <fieldset>
                        <label htmlFor="stepImage"> Step Image (optional) </label>
                        <input type="file" name="stepImage" className="form-control" onChange={updateImageString} />
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
                            {...register("seconds", { required: "Please provide the water temp used" })} />
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