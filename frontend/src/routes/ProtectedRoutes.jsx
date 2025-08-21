/* eslint-disable react/prop-types */
import { useContext } from "react"
import {Navigate} from 'react-router-dom'
import {authContext} from '../context/Authcontext'


const ProtectedRoutes = ({children, allowedRoles}) => {

    const {token, role} = useContext(authContext)

    const isAllowed = allowedRoles.includes(role)
    const accessibleRoutes = token && isAllowed ? children : <Navigate to='/login' replace={true} />
  
    return (
    accessibleRoutes

  )
}

export default ProtectedRoutes