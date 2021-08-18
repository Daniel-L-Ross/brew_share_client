import React, { useContext } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid } from '@ionic/react';
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
        <IonPage>
            
                <IonTitle>{pageTitle()}</IonTitle>
                <IonToolbar>
                    <SearchBar />

                </IonToolbar>

           
            <IonGrid>

                <IonContent className="ion-padding">

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
                </IonContent>
            </IonGrid>
        </IonPage>
    )
}