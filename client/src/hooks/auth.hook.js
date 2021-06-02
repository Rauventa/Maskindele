import {useState, useCallback, useEffect} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [name, setName] = useState(null)
    const [role, setRole] = useState(false)

    const login = useCallback((jwtToken, id, userName, userRole) => {
        setToken(jwtToken)
        setUserId(id)
        setName(userName)
        setRole(userRole)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, name: userName, role: userRole
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setName(null)
        setRole(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.name, data.role)
        }
    }, [login])

    return {login, logout, token, userId, name, role}
}