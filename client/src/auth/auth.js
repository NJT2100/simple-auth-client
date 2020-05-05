const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            false
    },
    authenticate(jwt, callback) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        if (typeof callback !== null) callback()
    },
    signout(callback) {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
        callback()
    }
}

export default auth