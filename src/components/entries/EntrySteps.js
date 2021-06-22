import React from "react"
import { Link } from "react-router-dom"

export const EntrySteps = ({ entry }) => {

    const steps = entry.steps
    {/* TODO: add images of each step if present */ }

    const actionButtons = (stepId) => {
        return (entry.edit_allowed) ?
            <>
                <Link to={`/entries/${entry.id}/steps/${stepId}/edit`}>
                    <button>Edit</button>
                </Link>
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
                                    {actionButtons(step.id)}
                                </div>
                            })}
                        </div>
                    </>
                    : <></>
            }
        </>
    )
}