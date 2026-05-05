import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { useAuthStore } from './useAuthStore'
import type {
  LoginForm,
  RegisterForm,
  AuthTokens,
  User,
} from '../schemas/auth.schema'

export function useLogin() {
  const { setTokens } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginForm) =>
      api.post<AuthTokens>('/auth/login', data).then((r) => r.data),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken)
      navigate('/')
    },
  })
}

export function useRegister() {
  const { setTokens } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterForm) =>
      api.post<AuthTokens>('/auth/register', data).then((r) => r.data),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken)
      navigate('/')
    },
  })
}

export function useMe() {
  const { accessToken, setUser } = useAuthStore()
  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<User>('/auth/me').then((r) => r.data),
    enabled: !!accessToken,
  })

  useEffect(() => {
    if (query.data) setUser(query.data)
  }, [query.data, setUser])

  return query
}

export function useLogout() {
  const { refreshToken, logout } = useAuthStore()
  const navigate = useNavigate()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () =>
      api.post('/auth/logout', { refreshToken }).then(() => undefined),
    onSettled: () => {
      logout()
      qc.clear()
      navigate('/login')
    },
  })
}
