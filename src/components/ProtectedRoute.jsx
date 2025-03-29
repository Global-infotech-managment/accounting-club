// components/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
