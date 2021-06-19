import React, { useContext, useEffect, useState } from "react"
import { EntryContext } from "./EntryProvider"
import { Link, userHistory, useParams } from "react-router-dom"

export const EntryList = () => {
    const { entries, getEntries } = useContext(EntryContext)


    useEffect(() => {
        getEntries()
    }, [])
    return (
        <>
            <h2>Entry List</h2>
            {
                entries.map(entry => {
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