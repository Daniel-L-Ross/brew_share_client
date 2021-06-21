import React from "react"

export const EntrySteps = ({ steps }) => {

    {/* TODO: add images of each step if present */ }
    
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
                                </div>
                            })}
                        </div>
                    </>
                    : <></>
            }
        </>
    )
}