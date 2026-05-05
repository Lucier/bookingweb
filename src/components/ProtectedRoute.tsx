import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'

interface Props {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly }: Props) {
  const { accessToken, user } = useAuthStore()

  if (!accessToken) return <Navigate to="/login" replace />
  if (adminOnly && user?.role !== 'ADMIN') return <Navigate to="/" replace />

  return <>{children}</>
}
