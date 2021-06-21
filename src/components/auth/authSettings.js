// If your json-server API URL or endpoint is different, please change it below!
export const authApi = {
    localApiBaseUrl: "http://localhost:8000",
    endpoint: "users"
}

// The user id is saved under the key brewer_id in session Storage. Change below if needed!
export const userTokenStorageKey = "brew_share_token"
export const userIsAdmin = JSON.parse(localStorage.getItem("isAdmin"))