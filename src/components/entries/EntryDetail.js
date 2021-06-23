import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { EntryContext } from "./EntryProvider"
import "./Entry.css"
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

    const handleTogglePrivacy = () => {
        togglePrivacy(entryId)
            .then(() => getSingleEntry(entryId))
    }

    const buttonBar = () => {
        return (entry.edit_allowed) ?
            <>
                <p>{entry.private ? "Private" : "Public"}</p>
                <label className="switch">
                    <input type="checkbox" checked={entry.private} onChange={handleTogglePrivacy} />
                    <span className="slider round"></span>
                </label>

                <button onClick={handleDelete}>Delete Entry</button>

                <Link to={`/entries/${entry.id}/edit`}>
                    <button >Edit Entry</button>
                </Link>

                <Link to={`/entries/${entry.id}/steps/add`}>
                    <button >Add step</button>
                </Link>

                <button onClick={handleToggleFavorite}>{entry.favorite ? "Unfavorite" : "Favorite"}</button>
            </>
            : <button onClick={handleToggleFavorite}>{entry.favorite ? "Unfavorite" : "Favorite"}</button>
    }

    return (
        <>
            {
                entry.id &&
                <div>
                    {/* TODO: add links to brew method and coffee */}
                    <h2> {entry.brewer.user.first_name}'s {entry.title}</h2>
                    <p>Notes: {entry.review}</p>
                    <p>Rating: {entry.rating}/5</p>
                    <p>Tasting-notes: {entry.tasting_notes}</p>
                    <p>Brewing: {entry.coffee.roaster} {entry.coffee.name}</p>
                    <p>Grind size: {entry.grind_size}</p>
                    <p>Method: {entry.method.name}</p>
                    <p>Water: {entry.water_volume}g at {entry.water_temp} F</p>
                    <h3>Setup</h3>
                    <p>{entry.setup}</p>
                    <EntrySteps entry={entry} />
                    {buttonBar()}
                </div>
            }
        </>
    )
}