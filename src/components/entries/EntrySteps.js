import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import { convertSeconds } from "../secondsConverter"
import { Accordion, Button, ButtonGroup, Card, Container, Image, InputGroup, ListGroup } from "react-bootstrap"

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

    const actionButtons = (step) => {
        return (entry.edit_allowed) ?
            <div>
                <Link className="m-1" to={`/entries/${entry.id}/steps/${step.id}/edit`}>
                    <Button variant="secondary">Edit</Button>
                </Link>
                <Link className="m-1" to={`/entries/${entry.id}/steps/add`}>
                    <Button >Add step</Button>
                </Link>
                <Button className="m-1" variant="danger" id={step.id} onClick={handleDelete}>Delete Step</Button>
            </div>
            : <> </>
    }

    return (
        <>
            {
                (steps?.length >= 1) ?
                    <>
                        <h3>STEPS</h3>
                        <div>
                            {steps.map(step => {
                                return <ListGroup key={`step--${step.id}`}>
                                    <ListGroup.Item>

                                        <InputGroup className="mb-2">

                                            <InputGroup.Text>
                                                {convertSeconds(step.seconds)}
                                            </InputGroup.Text>
                                            <InputGroup.Text>
                                                {step.descriptor}
                                            </InputGroup.Text>
                                            <InputGroup.Text>
                                                {step.instruction}
                                            </InputGroup.Text>

                                        </InputGroup>
                                        <Image className="rounded mx-auto d-block" style={{ maxWidth: `15em` }} src={step.step_image} />
                                        {actionButtons(step)}
                                    </ListGroup.Item>
                                </ListGroup>
                            })}
                        </div>
                    </>
                    : <></>
            }
        </>
    )
}