import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import { convertSeconds } from "../secondsConverter"
import { Accordion, Button, ButtonGroup, Card, Container, Image, InputGroup, ListGroup, Table } from "react-bootstrap"

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
let stepCount = 0
    return (
        <>
            {
                (steps?.length >= 1) ?
                    <>
                            {steps.map(step => {
                                stepCount += 1
                                return <ListGroup.Item key={`step--${step.id}`}>
                                    <h3>Step {stepCount}</h3>

                                        <Table striped bordered variant="light">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        TIME
                                                    </th>
                                                    <th>
                                                        ACTION
                                                    </th>
                                                    <th>
                                                        DETAIL
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td >
                                                        {convertSeconds(step.seconds)}
                                                    </td>
                                                    <td>
                                                        {step.descriptor}
                                                    </td>
                                                    <td>
                                                        {step.instruction}
                                                    </td>
                                                </tr>
                                            </thead>
                                        </Table>
                                        <Image className="rounded mx-auto d-block" style={{ maxWidth: `15em` }} src={step.step_image} />
                                        {actionButtons(step)}
                                    </ListGroup.Item>
                            })}
                    </>
                    : <></>
            }
        </>
    )
}