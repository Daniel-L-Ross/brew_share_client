import React, { useContext, useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import { SearchBar } from "./SearchBar"


export const EntryList = () => {
    const { entries, baseSearchUrl } = useContext(EntryContext)

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
        <>
            <h2>{pageTitle()}</h2>
            <SearchBar />
            {
                entries.length && entries.map(entry => {
                    return <div key={`entry--${entry.id}`}>
                        <Link to={`/entries/${entry.id}/detail`}>
                            <h3>{entry.title} | {entry.brewer.user.first_name} {entry.brewer.user.last_name}</h3>
                        </Link>

                        <p>{entry.coffee.roaster} {entry.coffee.name} - {entry.method.name}</p>
                    </div>
                })
            }
        </>
    )
}