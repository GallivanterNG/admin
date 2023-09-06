import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth_contaxt'


const ProtectedRoutes = ({ children }) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to='/signin' />
    }
    return children
}

export default ProtectedRoutes;
