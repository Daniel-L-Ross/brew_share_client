import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { EntryContext } from "./EntryProvider"

export const EntryDetail = () => {
    const { getSingleEntry, addFavoriteEntry, deleteFavoriteEntry, deleteEntry, togglePrivacy } = useContext(EntryContext)
    const [entry, setEntry] = useState({})
    const { entryId } = useParams()

    const history = useHistory()

    useEffect(() => {
        getSingleEntry(entryId)
            .then(setEntry)
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
                    getSingleEntry(entryId)
                        .then(setEntry))
        } else {
            addFavoriteEntry(entryId)
                .then(() =>
                    getSingleEntry(entryId)
                        .then(setEntry))
        }
    }

    const handleTogglePrivacy = () => {
        togglePrivacy(entryId)
            .then(() => getSingleEntry(entryId))
            .then(setEntry)
    }

    return (
        <>
            {
                entry.id ?
                    <div>
                        {/* TODO: add links to brew method and coffee */}
                        <h2> {entry.brewer.user.first_name}'s {entry.title}</h2>
                        {JSON.parse(entry.edit_allowed) ?
                            <>
                                <p>{entry.private ? "Private" : "Public"}</p>
                                <label class="switch">
                                    <input type="checkbox" checked={entry.private} onClick={handleTogglePrivacy}/>
                                    <span class="slider round"></span>
                                </label>
                            </>
                            : <></>
                        }
                        <p>Notes: {entry.review}</p>
                        <p>Rating: {entry.rating}/5</p>
                        <p>Tasting-notes: {entry.tasting_notes}</p>
                        <p>Brewing: {entry.coffee.roaster} {entry.coffee.name}</p>
                        <p>Grind size: {entry.grind_size}</p>
                        <p>Method: {entry.method.name}</p>
                        <p>Water: {entry.water_volume}g at {entry.water_temp} F</p>
                        <h3>Setup</h3>
                        <p>{entry.setup}</p>
                        <button onClick={handleToggleFavorite}>{entry.favorite ? "Unfavorite" : "Favorite"}</button>
                        {entry.favorite && <p>This is one of your favorites!</p>}

                        {JSON.parse(entry.edit_allowed) ?
                            <Link to={`/entries/${entry.id}/edit`}>
                                <button >Edit Entry</button>
                            </Link>
                            : <> </>
                        }
                        {JSON.parse(entry.edit_allowed) ?
                            <button onClick={handleDelete}>Delete Entry</button>
                            : <> </>
                        }

                        {
                            (entry.steps.length > 1) ?
                                <div>
                                    <h2>STEPS</h2>
                                    <div>
                                        {entry.steps.map(step => {
                                            return <div key={`step--${step.id}`}>
                                                <p>{step.seconds}</p>
                                                <p>{step.descriptor}</p>
                                                <p>{step.instruction}</p>
                                                {/* TODO: add images of each step if present */}
                                            </div>
                                        })}
                                    </div>
                                </div>
                                : <div></div>
                        }
                    </div>
                    : <div>loading...</div>
            }
        </>
    )
}