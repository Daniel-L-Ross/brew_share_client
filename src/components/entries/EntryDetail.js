import React, { useContext, useEffect } from "react"
import { ButtonGroup, Button, Card, Container, Row, Col, InputGroup, Dropdown } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import { EntrySteps } from "./EntrySteps"

export const EntryDetail = () => {
    const { entry, getSingleEntry, addFavoriteEntry, deleteFavoriteEntry, deleteEntry, togglePrivacy } = useContext(EntryContext)
    const { entryId } = useParams()

    const history = useHistory()

    useEffect(() => {
        getSingleEntry(entryId)
    }, [])

    const handleDelete = () => {
        if (window.confirm("Do you want to delete this entry? This cannot be undone.")) {
            deleteEntry(entry.id)
                .then(history.push("/"))
        }
    }

    // send fetch call to create or delete a favorite association
    const handleToggleFavorite = () => {
        if (entry.favorite) {
            deleteFavoriteEntry(entryId)
                .then(() =>
                    getSingleEntry(entryId))
        } else {
            addFavoriteEntry(entryId)
                .then(() =>
                    getSingleEntry(entryId))
        }
    }

    // send fetch call to toggle privacy
    const handleTogglePrivacy = () => {
        togglePrivacy(entryId)
            .then(() => getSingleEntry(entryId))
    }
    // manage what buttons should be displayed on the post based on current users edit privileges 
    const buttonBar = () => {
        return (entry.edit_allowed) ?
            <Row>
                <Col xs={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            Visibility: 
                        </InputGroup.Text>
                        <Button onClick={handleTogglePrivacy}>{entry.private ? "Private" : "Public"}</Button>
                    </InputGroup>
                </Col>
                <Col xs={2}>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            More...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                            <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>

                            <Link to={`/entries/${entry.id}/edit`}>
                                <Button variant="secondary">Edit Entry</Button>
                            </Link>

                            <Link to={`/entries/${entry.id}/steps/add`}>
                                <Button >Add step</Button>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            : <> </>
    }

    return (
        <Container>
            {
                entry.id &&
                <Card className="mt-4" bg="light">
                    {/* TODO: add links to brew method and coffee */}
                    <Card.Header as="h2">
                        <Row xs={10} >
                            <Col xs={8} >
                                {entry.brewer.user.first_name}'s {entry.title}
                            </Col>
                            <Col xs={2} >
                                <Button className="ml-2" onClick={handleToggleFavorite}>{entry.favorite ? "Unfavorite" : "Favorite"}</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {buttonBar()}
                        <Card.Text>
                            <p><b>Notes:</b> {entry.review}</p>
                            <p><b>Rating:</b> {entry.rating}/5</p>
                            <p><b>Tasting-notes:</b> {entry.tasting_notes}</p>
                            <p><b>Brewing:</b> {entry.coffee.roaster} {entry.coffee.name}</p>
                            <p><b>Grind size:</b> {entry.grind_size}</p>
                            <p><b>Method:</b> {entry.method.name}</p>
                            <p><b>Water:</b> {entry.water_volume}g at {entry.water_temp} F</p>
                            <h3>Setup</h3>
                            <p>{entry.setup}</p>
                        </Card.Text>
                        <EntrySteps entry={entry} />

                    </Card.Body>
                </Card>
            }
        </Container>
    )
}