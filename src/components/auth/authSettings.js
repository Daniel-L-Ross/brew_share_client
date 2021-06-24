// If your server API URL or endpoint is different, please change it below!
export const authApi = {
    localApiBaseUrl: "https://brewshare.herokuapp.com"
}

// The user id is saved under the key brewer_id in session Storage. Change below if needed!
export const userTokenStorageKey = "brew_share_token"
export const username = () => localStorage.getItem("username")