const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            false
    },
    authenticate(jwt) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
    },
    signout() {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
    }
}

export default auth