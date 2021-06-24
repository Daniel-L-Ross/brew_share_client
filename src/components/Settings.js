import { userTokenStorageKey } from "./auth/authSettings";

export const apiHeaders = () => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem(userTokenStorageKey)}`
    }
}


export const apiSettings = {
    baseUrl: "http://localhost:8000"
}