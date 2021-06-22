import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { EntryContext } from "./EntryProvider"

// deleteStep
export const EntrySteps = ({ entry }) => {
    const { deleteStep, getSingleEntry } = useContext(EntryContext)

    const steps = entry.steps

    const handleDelete = (event) => {
        if (window.confirm("Do you want to delete this step? This cannot be undone")) {
            deleteStep(event.target.id, entry.id)
            .then(getSingleEntry(entry.id))
        }
    }

    {/* TODO: add images of each step if present */ }

    const actionButtons = (step) => {
        return (entry.edit_allowed) ?
            <>
                <Link to={`/entries/${entry.id}/steps/${step.id}/edit`}>
                    <button>Edit</button>
                </Link>
                    <button id={step.id} onClick={handleDelete}>Delete</button>
            </>
            : <> </>
    }

    return (
        <>
            {
                (steps?.length > 1) ?
                    <>
                        <h2>STEPS</h2>
                        <div>
                            {steps.map(step => {
                                return <div key={`step--${step.id}`}>
                                    <p>{step.seconds}</p>
                                    <p>{step.descriptor}</p>
                                    <p>{step.instruction}</p>
                                    {actionButtons(step)}
                                </div>
                            })}
                        </div>
                    </>
                    : <></>
            }
        </>
    )
}