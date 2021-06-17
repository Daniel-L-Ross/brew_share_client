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
                    return <div>
                        <h3>{entry.title}</h3>
                    </div>
                })
            }
        </>
    )
}