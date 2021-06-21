import React, { useContext, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { Link, useParams } from "react-router-dom"

export const EntryList = () => {
    const { entries, getEntries, getFavoriteEntries } = useContext(EntryContext)

    const {username} = useParams()
    const listFavorites = username

    useEffect(() => {
        if (listFavorites) {
            getFavoriteEntries(username)
            console.log(username)
        } else {
            getEntries()
        }
    }, [])
    return (
        <>
            <h2>{ username ? `${username}'s Favorites` : "Entry List"}</h2>
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