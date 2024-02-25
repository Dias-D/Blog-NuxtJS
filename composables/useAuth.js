export function useAuth() {
    function setToken(token) {
        localStorage.setItem('token', JSON.stringify({ token }))
    }

    function getToken() {
        const token = JSON.parse(localStorage.getItem('token'))

        return token.token;
    }

    function removeToken() {
        localStorage.removeItem('token')
    }

    const isLoggedIn = computed(() => {
        if (process.client) {
            return !!localStorage.getItem('token')
        }
    })

    return { setToken, getToken, removeToken, isLoggedIn }
}
