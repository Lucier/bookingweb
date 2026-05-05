import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthStore()
  if (accessToken) return <Navigate to="/" replace />
  return <>{children}</>
}
