const TokenKey = 'Authorization';

export function getToken() {
    return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return window.sessionStorage.clear()
}
