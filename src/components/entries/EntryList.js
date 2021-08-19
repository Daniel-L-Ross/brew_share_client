import React, { useContext, useEffect } from "react"
import { Card, Container } from "react-bootstrap"
import { Link, useParams, useLocation } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import { SearchBar } from "./SearchBar"


export const EntryList = () => {
    const { entries } = useContext(EntryContext)

    const location = useLocation()
    const { username } = useParams()

    const pageTitle = () => {
        if (username && location.pathname.includes("favorites")) {
            return `${username}'s Favorites`
        } else if (username && location.pathname.includes("my-entries")) {
            return "Your Entries"
        } else {
            return "Entries"
        }
    }
    return (
        <Container >
            <h2>{pageTitle()}</h2>
            <SearchBar />
            {
                entries.length && entries.map(entry => {
                    return <Card key={`entry--${entry.id}`} className="mt-4">
                        <Link to={`/entries/${entry.id}/detail`}>
                            <Card.Header as="h3">{entry.title} | {entry.brewer.user.first_name} {entry.brewer.user.last_name}</Card.Header>
                        </Link>
                        <Card.Body>
                            <Card.Text>
                                {entry.coffee.roaster} {entry.coffee.name} - {entry.method.name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                })
            }
        </Container>
    )
}